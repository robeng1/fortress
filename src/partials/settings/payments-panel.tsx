import React from "react"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { Formik } from "formik"
import {
  Account,
  AccountStatus,
  PaymentMode,
} from "typings/payment/account-type"
import { useAtom } from "jotai"
import { request, ResponseError } from "utils/request"
import { paymentURL } from "endpoints/urls"
import { uidAtom } from "store/authorization-atom"
import usePayment from "hooks/use-payment"
import useShop from "hooks/use-shop"
import { Loading } from "components/blocks/backdrop"
import { useNavigate } from "react-router-dom"

function PaymentsPanel() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { shop } = useShop()
  const { shopAccount: paymentAccount } = usePayment()
  const [accountId] = useAtom(uidAtom)
  const requestURL = `${paymentURL}/${accountId}/accounts`

  // create the colletion
  const { mutate: createAccount, isLoading: isCreatingAccount } = useMutation(
    (payload: any) =>
      request(requestURL, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newAccount: Account) => {
        toast.success("Payment data updated succesffully")
        queryClient.setQueryData(["payment", shop?.shop_id], newAccount)
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    }
  )

  // update the collection
  const { mutate: updateAccount, isLoading: isUpdatingAccount } = useMutation(
    (payload: any) =>
      request(`${requestURL}/${paymentAccount?.account_id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newAccount: Account) => {
        toast("Payment data updated succesffully")
        queryClient.setQueryData(["payment", shop?.shop_id], newAccount)
      },
      onError: (e: ResponseError) => {},
    }
  )

  return (
    <div>
      <Loading open={isUpdatingAccount || isCreatingAccount} />
      <Formik
        enableReinitialize
        initialValues={{
          account_id: paymentAccount?.account_id || "",
          name: shop?.business_name || "",
          primary_user: shop?.shop_id,
          currency: shop?.currency?.iso_code,
          // payment_data: account?.payment_data || 'wallet',
          wallet: {
            merchant: paymentAccount?.wallet?.merchant || "",
            name: paymentAccount?.wallet?.name || "",
            number: paymentAccount?.wallet?.number || "",
          },
          payment_mode:
            paymentAccount?.payment_mode || PaymentMode.MOBILE_NETWORK,
          status: paymentAccount?.status || AccountStatus.OPEN,
          account_kind: paymentAccount?.account_kind || "REGULAR",
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.account_id !== "") {
            updateAccount({ account: { ...paymentAccount, ...values } })
          } else {
            createAccount({ account: { ...values } })
          }
          setSubmitting(false)
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
              <h2 className="text-2xl text-gray-700 font-bold mb-5">
                Payout settings
              </h2>

              {/* Mobile Money */}
              <section>
                <h3 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Mobile Money
                </h3>
                <div className="text-sm">Your Mobile Money account details</div>
                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="w-full">
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

                <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                  <div className="md:w-4/5">
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
                {/* <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
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
                    <p className="text-purple-500 text-xs">
                      This will used as Mobile Money Reference/Bank Invoice name
                      during payout
                    </p>
                  </div>
                </div> */}
              </section>

              {/* Bank */}
              <section>
                <h3 className="text-xl leading-snug text-gray-700 font-bold mb-1">
                  Bank Account
                </h3>
                <ul>
                  <li className="flex justify-between items-center py-3 border-b border-gray-200">
                    {/* Left */}
                    <div>
                      <div className="text-gray-700 font-semibold italic">
                        Bank support is coming soon
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
                  <button
                    onClick={() => navigate("/settings")}
                    className="btn border-teal-600 hover:border-gray-700 text-gray-600 bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSubmit()
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
  )
}

export default PaymentsPanel
