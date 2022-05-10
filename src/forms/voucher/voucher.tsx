import { Formik } from 'formik';
import moment from 'moment';
import { discountOptions } from 'services';
import { VoucherType } from 'typings/voucher/voucher';
import { request, ResponseError } from 'utils/request';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { VoucherSetType } from 'typings/voucher/voucherset';
import { fortressURL } from 'endpoints/urls';
import ReactSelect from 'react-select/async-creatable';
import useShop from 'hooks/use-shop';
import { useNavigate, useParams } from 'react-router-dom';
import { Loading } from 'components/blocks/backdrop';
import customSelectStyles from 'forms/product/styles';
import toast from 'react-hot-toast';

const SINGLE_CODE_TYPE = 'single'
const MULTI_CODE_TYPE = 'multi'

const VoucherForm = ({ id, codeType }) => {
  codeType = SINGLE_CODE_TYPE;
  const navigate = useNavigate();
  const klient = useQueryClient();
  const { shop } = useShop();
  const vRequestURL = `${fortressURL}/shops/${shop?.shop_id}/vouchers`;
  const vsRequestURL = `${fortressURL}/shops/${shop?.shop_id}/voucher-sets`;

  // query for getting the voucher
  const { data: voucher, isLoading: isVoucherLoading } = useQuery<VoucherType>(
    ['voucher', id],
    async () => await request(`${vRequestURL}/${id}`),
    {
      // The query will not execute until the id exists
      enabled: !!id && codeType === SINGLE_CODE_TYPE,
      keepPreviousData: true,
    },
  );

  // query for getting the voucher set
  const { data: voucherSet, isLoading: isVoucherSetLoading } =
    useQuery<VoucherType>(
      ['voucherset', id],
      async () => await request(`${vsRequestURL}/${id}`),
      {
        // The query will not execute until the id exists
        enabled: !!id && codeType === MULTI_CODE_TYPE,
        keepPreviousData: true,
      },
    );

  // create the voucher
  const { mutate: createSingle } = useMutation(
    (payload: VoucherType) =>
      request(vRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucher: VoucherType) => {
        klient.setQueryData(['voucher', id], newVoucher);
        toast.success("Voucher created successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    },
  );

  // update the voucher
  const { mutate: updateSingle } = useMutation(
    (payload: VoucherType) =>
      request(`${vRequestURL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucher: VoucherType) => {
        klient.setQueryData(['voucher', id], newVoucher);
        toast.success("Voucher updated successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    },
  );

  // create the voucherset
  const { mutate: createSet } = useMutation(
    (payload: VoucherSetType) =>
      request(vsRequestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucherSet: VoucherSetType) => {
        klient.setQueryData(['voucherset', id], newVoucherSet);
        toast.success("Voucher set created successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    },
  );

  // update the voucherset
  const { mutate: updateSet } = useMutation(
    (payload: VoucherSetType) =>
      request(`${vsRequestURL}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newVoucherSet: VoucherSetType) => {
        klient.setQueryData(['voucherset', id], newVoucherSet);
        toast.success("Voucher set updated successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    },
  );

  return (
    <>
      <Loading open={isVoucherLoading || isVoucherSetLoading} />
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: '',
            start_date: '',
            start_time: '',
            end_date: '',
            description: '',
            end_time: '',
            discount: null,
            code_type: SINGLE_CODE_TYPE,
            code: '',
            usage: '',
            code_length: 6,
            count: 1,
          }}
          onSubmit={(values, { setSubmitting }) => {
            if (!values.discount || values.discount === null || values.discount === "") {
              toast.error("Discount is required for voucher")
              return
            } else {
              if (voucher || voucherSet) {
                if (values.code_type === SINGLE_CODE_TYPE) {
                  const vals = values as unknown as VoucherType
                  updateSingle({
                    ...voucher,
                    name: vals.name,
                    code: vals.code,
                    usage: vals.usage,
                    voucher_id: id,
                    discount_id: values.discount['key'],
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  } as VoucherType);
                } else {
                  const vals = values as unknown as VoucherSetType
                  updateSet({
                    ...voucherSet,
                    name: vals.name,
                    description: vals.description,
                    code_length: vals.code_length,
                    count: vals.count,
                    discount_id: values.discount['key'],
                    set_id: id,
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  } as VoucherSetType);
                }
              } else {
                if (values.code_type === SINGLE_CODE_TYPE) {
                  const vals = values as unknown as VoucherType
                  createSingle({
                    name: vals.name,
                    code: vals.code,
                    usage: vals.usage,
                    voucher_id: '',
                    discount_id: values.discount['key'],
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  } as VoucherType);
                } else {
                  const vals = values as unknown as VoucherSetType
                  createSet({
                    name: vals.name,
                    code_length: vals.code_length,
                    count: vals.count,
                    description: vals.description,
                    set_id: '',
                    discount_id: values.discount['key'],
                    start_datetime: moment(
                      values.start_date + ' ' + values.start_time,
                    ).toISOString(),
                    end_datetime: moment(
                      values.end_date + ' ' + values.end_time,
                    ).toISOString(),
                  } as VoucherSetType);
                }
              }
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <div className="lex-grow w-full mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                <div className="col-span-1 md:col-span-2">
                  <section className="rounded bg-white shadow overflow-hidden p-3">
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 mb-3">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="name"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          className="form-input w-full md:w-2/3"
                          type="text"
                          autoComplete="name"
                          placeholder="X-mas Sales"
                        />
                      </div>
                    </div>
                  </section>
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="code_type"
                    >
                      Code type
                    </label>
                    <div className="m-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="code_type"
                          className="form-radio"
                          onChange={e => setFieldValue('code_type', SINGLE_CODE_TYPE)}
                          checked={values.code_type === SINGLE_CODE_TYPE}
                          value={values.code_type}
                        />
                        <span className="text-sm ml-2">Single</span>
                      </label>
                    </div>
                    <div className="m-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="code_type"
                          className="form-radio"
                          onChange={e => setFieldValue('code_type', MULTI_CODE_TYPE)}
                          checked={values.code_type === MULTI_CODE_TYPE}
                          value={values.code_type}
                        />
                        <span className="text-sm ml-2">Multi</span>
                      </label>
                    </div>
                    {values.code_type === SINGLE_CODE_TYPE && (
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="code"
                          >
                            Code
                          </label>
                          <input
                            id="code"
                            name="code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.code}
                            className="form-input"
                            type="text"
                            placeholder="SPRNGSALE"
                          />
                        </div>
                      </div>
                    )}
                    {values.code_type === MULTI_CODE_TYPE && (
                      <>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="code_length"
                            >
                              Code Length
                            </label>
                            <input
                              id="code_length"
                              name="code_length"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code_length}
                              className="form-input"
                              type="number"
                              min={1}
                              step={1}
                              max={10}
                              placeholder="1"
                            />
                          </div>
                        </div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="count"
                            >
                              Number of codes
                            </label>
                            <input
                              id="count"
                              name="count"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.count}
                              className="form-input"
                              type="number"
                              min={1}
                              step={1}
                              placeholder="1"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="w-full">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="discount"
                        >
                          Which offer apply for this voucher(s)?
                        </label>
                        <ReactSelect
                          id="discount"
                          name="discount"
                          closeMenuOnSelect={true}
                          value={values.discount}
                          isClearable
                          isSearchable
                          isMulti={false}
                          menuPortalTarget={document.body}
                          onChange={option => setFieldValue('discount', option)}
                          loadOptions={discountOptions(shop?.shop_id!)}
                          styles={{
                            ...customSelectStyles,
                          }}
                          className="w-full md:w-2/3"
                        />
                      </div>
                    </div>
                    <div className="sm:w-1/2 mt-6">
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="usage"
                      >
                        Usage
                      </label>
                      <select
                        name="usage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.usage}
                        id="usage"
                        className="form-select block w-full"
                      >
                        <option value="">Please Select</option>
                        <option value="multi_use">
                          Can be used multiple times by multiple customers
                        </option>
                        <option value="single_use">
                          Can be used once by one customer
                        </option>
                        <option value="once_per_customer">
                          Can only be used once per customer
                        </option>
                      </select>
                    </div>
                  </section>
                  <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                    <h2 className="text-sm header leading-snug text-gray-500 font-bold mb-1">
                      Active Dates
                    </h2>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="start_date"
                        >
                          Start Date
                        </label>
                        <input
                          id="start_date"
                          name="start_date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start_date}
                          className="form-input w-full"
                          type="date"
                          placeholder="RS6TR"
                        />
                      </div>
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="start_time"
                        >
                          Start time
                        </label>
                        <input
                          id="start_time"
                          name="start_time"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.start_time}
                          className="form-input"
                          type="time"
                          placeholder="217328189902301"
                        />
                      </div>
                    </div>
                    <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="end_date"
                        >
                          End Date
                        </label>
                        <input
                          id="end_date"
                          name="end_date"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.end_date}
                          className="form-input w-full"
                          type="date"
                          placeholder="RS6TR"
                        />
                      </div>
                      <div className="sm:w-1/2">
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="end_time"
                        >
                          End time
                        </label>
                        <input
                          id="end_time"
                          name="end_time"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.end_time}
                          className="form-input"
                          type="time"
                          placeholder="217328189902301"
                        />
                      </div>
                    </div>
                  </section>
                </div>
                <div></div>
              </div>
              <footer>
                <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                  <div className="flex self-end md:self-center">
                    <button
                      onClick={() => navigate(-1)}
                      className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={e => handleSubmit()}
                      className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </footer>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default VoucherForm;
