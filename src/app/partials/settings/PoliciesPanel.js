import React from 'react';
import { Formik } from 'formik';
import { selectShop } from 'app/features/settings/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useSettingSlice } from 'app/features/settings';

function PoliciesPanel() {
  const dispatch = useDispatch();
  const { actions } = useSettingSlice();
  const shop = useSelector(selectShop);

  return (
    <>
      <Formik
        initialValues={{
          refund_policy:
            shop.policies.find(p => p.p_type === 'refund_policy')?.body || '',
          shipping_policy:
            shop.policies.find(p => p.p_type === 'shipping_policy')?.body || '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          let policies = [];
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
              shop.policies.find(p => p.p_type === 'shipping_policy')?.body
          ) {
            policies = [
              {
                p_type: 'shipping_policy',
                title: 'Shipping Policy',
                body: values.shipping_policy,
              },
            ];
          }
          if (policies.length > 0) {
            dispatch(actions.updateShop({ ...shop, policies }));
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
                  <h2 className="text-2xl text-gray-800 font-bold mb-4">
                    Legal Policies
                  </h2>
                  <div className="text-sm">
                    Having a good refund, shipping & terms of service policy is
                    great for conversion
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Refund Policy
                </h3>
                <div className="text-sm">How do you handle refunds?</div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full md:w-1/2">
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
                      type="text"
                      values={values.refund_policy}
                      onChange={handleChange}
                      onBlue={handleBlur}
                      multiple
                      rows={10}
                      placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                    />
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-xl leading-snug text-gray-800 font-bold mb-1">
                  Shipping Policy
                </h3>
                <div className="text-sm">
                  How do you handle shipping & returns?
                </div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full md:w-1/2">
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="shipping_policy"
                    >
                      Shipping Policy
                    </label>
                    <textarea
                      id="shipping_policy"
                      name="shipping_policy"
                      values={values.shipping_policy}
                      onChange={handleChange}
                      onBlue={handleBlur}
                      className="form-textarea w-full"
                      type="text"
                      multiple
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
                  <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
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

export default PoliciesPanel;
