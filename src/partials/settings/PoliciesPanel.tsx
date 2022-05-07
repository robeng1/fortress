import React from 'react';
import { Formik } from 'formik';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { fortressURL } from 'endpoints/urls';
import { ShopType } from 'typings/settings/shop-type';
import { uidAtom } from 'store/authorization-atom';
import { request, ResponseError } from 'utils/request';
import toast from 'react-hot-toast';
import useShop from 'hooks/use-shop';
import { Loading } from 'components/blocks/backdrop';

function PoliciesPanel() {
  const queryClient = useQueryClient();
  const { shop } = useShop();
  const [accountId] = useAtom(uidAtom);
  const requestURL = `${fortressURL}/shops`;

  // update the shop
  const { mutate: updateShop, isLoading: isUpdatingShop } = useMutation(
    (payload: ShopType) =>
      request(`${requestURL}/${shop?.shop_id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newShop: ShopType) => {
        queryClient.setQueryData(['shop', accountId], newShop);
        toast.success('Polices updated succesffully');
      },
      onError: (e: ResponseError) => {
        toast.error(e.message);
      },
    },
  );
  return (
    <div>
      <Loading open={isUpdatingShop} />
      <Formik
        enableReinitialize
        initialValues={{
          refund_policy:
            shop?.policies?.find(p => p.p_type === 'refund_policy')?.body || '',
          shipping_policy:
            shop?.policies?.find(p => p.p_type === 'shipping_policy')?.body ||
            '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          let policies: any[] = [];
          if (values.refund_policy !== '') {
            policies = [
              {
                p_type: 'refund_policy',
                title: 'Refund Policy',
                body: values.refund_policy,
              },
            ];
          }
          if (
            values.shipping_policy !== '' &&
            values.refund_policy !==
              shop?.policies?.find(p => p.p_type === 'shipping_policy')?.body
          ) {
            policies = [
              ...policies,
              {
                p_type: 'shipping_policy',
                title: 'Shipping Policy',
                body: values.shipping_policy,
              },
            ];
          }
          if (policies.length > 0) {
            updateShop({ ...shop, policies });
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
              {/* Plans */}
              <section>
                <div className="mb-8">
                  <h2 className="text-2xl text-gray-700 font-bold mb-4">
                    Legal Policies
                  </h2>
                  <div className="text-sm">
                    Having a good refund, shipping & terms of service policy is
                    great for conversion
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Refund Policy
                </h3>
                <div className="text-sm">How do you handle refunds?</div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="refund_policy"
                    >
                      Refund Policy
                    </label>
                    <textarea
                      id="refund_policy"
                      name="refund_policy"
                      className="form-textarea w-full"
                      value={values.refund_policy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={10}
                      placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                    />
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Shipping Policy
                </h3>
                <div className="text-sm">
                  How do you handle shipping & returns?
                </div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="shipping_policy"
                    >
                      Shipping Policy
                    </label>
                    <textarea
                      id="shipping_policy"
                      name="shipping_policy"
                      value={values.shipping_policy}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-textarea w-full"
                      rows={10}
                      placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Panel footer */}
            <footer>
              <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                <div className="flex self-end">
                  <button className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={e => {
                      e.stopPropagation();
                      handleSubmit();
                    }}
                    className="btn bg-purple-600 bg-opacity-100 rounded  text-white ml-3"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </footer>
          </div>
        )}
      </Formik>
    </div>
  );
}

export default PoliciesPanel;
