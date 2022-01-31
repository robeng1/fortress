import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Formik } from 'formik';
import {
  Account,
  AccountStatus,
  PaymentMode,
} from 'app/models/payment/account-type';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import { accountAtom } from 'store/payment';
import { request, ResponseError } from 'utils/request';
import { paymentURL } from 'app/endpoints/urls';
import { accountIdAtom } from 'store/authorization-atom';

function PaymentsPanel() {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const [account] = useAtom(accountAtom);
  const [accountId] = useAtom(accountIdAtom);
  const requestURL = `${paymentURL}/${accountId}/accounts`;

  // create the colletion
  const {
    mutate: createAccount,
    // isLoading: isCreatingCollection,
    // isError: collectionCreationFailed,
    // error: collectionCreationError,
  } = useMutation(
    (payload: Account) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newCollection: Account) => {
        queryClient.invalidateQueries(['account', shop?.shop_id]);
      },
      onError: (e: ResponseError) => {},
    },
  );

  // update the collection
  const { mutate: updateAccount } = useMutation(
    (payload: Account) =>
      request(`${requestURL}/${account?.account_id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newAccount: Account) => {
        queryClient.invalidateQueries(['account', shop?.shop_id]);
      },
      onError: (e: ResponseError) => {},
    },
  );

  return (
    <>
      <Formik
        initialValues={{
          account_id: account?.account_id || '',
          name: shop?.business_name || '',
          primary_user: shop?.shop_id,
          payment_data: account?.payment_data || 'wallet',
          wallet: {
            merchant: account?.wallet?.merchant || '',
            name: account?.wallet?.name || '',
            number: account?.wallet?.number || '',
          },
          payment_mode: account?.payment_mode || PaymentMode.MOBILE_NETWORK,
          status: account?.status || AccountStatus.OPEN,
          account_kind: account?.account_kind || 'REGULAR',
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.account_id !== '') {
            updateAccount({ ...account, ...values });
          } else {
            createAccount({ ...values });
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          setFieldError,
          setValues,
          setFieldTouched,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <div className="flex-grow">
            {/* Panel body */}
            <div className="md:p-6 p-4 space-y-6">
              <h2 className="text-2xl text-gray-800 font-bold mb-5">
                Payout settings
              </h2>

              {/* Mobile Money */}
              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Mobile Money
                </h3>
                <div className="text-sm">Your Mobile Money account details</div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Name of Account
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-input w-full"
                      type="text"
                      autoComplete="account-name"
                      placeholder="Romeo Obeng"
                    />
                  </div>
                </div>

                <div className="sm:flex sm:items-center sm:w-1/2 space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="sm:w-1/5">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="wallet.merchant"
                    >
                      Provider
                    </label>
                    <select
                      id="wallet.merchant"
                      name="wallet.merchant"
                      value={values.wallet.merchant}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="provider"
                      className="form-select block w-full"
                    >
                      <option value="">Please Select</option>
                      <option value="MTN">MTN</option>
                      <option value="Vodafone">Vodafone</option>
                      <option value="AirtelTigo">AirtelTigo</option>
                    </select>
                  </div>
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="wallet.number"
                    >
                      Phone
                    </label>
                    <input
                      id="wallet.number"
                      name="wallet.number"
                      className="form-input w-full"
                      type="tel"
                      value={values.wallet.number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="phone"
                      placeholder="+233246493078"
                    />
                  </div>
                </div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="payout-descriptor"
                    >
                      How should we describe the transaction during payout?
                    </label>
                    <input
                      id="payout-descriptor"
                      className="form-input w-full"
                      type="text"
                      placeholder="Rocketship Store Revenue"
                    />
                    <p className="text-blue-500 text-xs">
                      This will used as Mobile Money Reference/Bank Invoice name
                      during payout
                    </p>
                  </div>
                </div>
              </section>

              {/* Bank */}
              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Bank Account
                </h3>
                <ul>
                  <li className="flex justify-between items-center py-3 border-b border-gray-200">
                    {/* Left */}
                    <div>
                      <div className="text-gray-800 font-semibold italic">
                        Only Mobile Money is supported now. Bank support is
                        coming soon
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>

            {/* Panel footer */}
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end">
                  <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                    Cancel
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
                    className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </Formik>
    </>
  );
}

export default PaymentsPanel;
