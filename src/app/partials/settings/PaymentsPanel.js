import React from 'react';
import { Formik } from 'formik';
import { selectShop } from 'app/features/settings/selectors';
import { useDispatch, useSelector } from 'react-redux';
// import { useSettingSlice } from 'app/features/settings';
import { selectPaymentAccount } from 'app/features/payment/selectors';
import { usePaymentSlice } from 'app/features/payment';
import { AccountStatus, PaymentMode } from 'app/models/payment/account-type';
import money from 'app/utils/money';

function PaymentsPanel() {
  const dispatch = useDispatch();
  const { actions } = usePaymentSlice();
  const shop = useSelector(selectShop);
  const account = useSelector(selectPaymentAccount);

  return (
    <>
      <Formik
        initialValues={{
          account_id: account.account_id || '',
          name: shop.business_name || '',
          primary_user: shop.shop_id,
          payment_data: account.payment_data || 'wallet',
          wallet: {
            merchant: account.wallet?.merchant || '',
            name: account.wallet?.name || '',
            number: account.wallet?.number || '',
          },
          payment_mode: account.payment_mode || PaymentMode.MOBILE_NETWORK,
          status: account.status || AccountStatus.OPEN,
          account_kind: account.account_kind || 'REGULAR',
          credit_limit: money.Zero(),
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.account_id !== '') {
            dispatch(actions.updateAccount({ ...account, ...values }));
          } else {
            dispatch(actions.createAccount({ ...values }));
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
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      className="form-input w-full"
                      type="text"
                      autoComplete="account-name"
                      placeholder="Romeo Obeng"
                    />
                  </div>
                </div>

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="sm:w-1/3">
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
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      autoComplete="provider"
                      className="form-select block w-full"
                    >
                      <option value="">Please Select</option>
                      <option value="MTN">MTN</option>
                      <option value="Vodafone">Vodafone</option>
                      <option value="AirtelTigo">AirtelTigo</option>
                    </select>
                  </div>
                  <div className="sm:w-1/3">
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
                      handleChange={handleChange}
                      handleBlur={handleBlur}
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
                    onclick={handleSubmit}
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
