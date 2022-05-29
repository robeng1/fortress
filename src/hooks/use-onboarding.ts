import { useEffect } from "react"
import isEmpty from "lodash/isEmpty"
import { useLocation, useNavigate } from "react-router-dom"
import useCentres from "./use-location"
import usePayment from "./use-payment"
import useShop from "./use-shop"

export function useOnboarding(loc?: string) {
  const { shop, isLoading: shopIsLoading } = useShop()
  const { locations, isLoading: locationIsLoading } = useCentres()
  const { shopAccount, isLoading: accountIsLoading } = usePayment()
  let invalidCurrency = false
  if (
    !shop?.currency ||
    shop.currency.iso_code === "" ||
    isEmpty(shop.currency)
  ) {
    invalidCurrency = true
  }
  let noLocation = false
  if (!locationIsLoading && (locations === undefined || isEmpty(locations))) {
    noLocation = true
  }
  let noPayoutInfo = false
  if (
    !accountIsLoading &&
    (isEmpty(shopAccount) || (shopAccount && !shopAccount.account_id))
  ) {
    noPayoutInfo = true
  }
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location

  useEffect(() => {
    if (!shopIsLoading && shop) {
      if (invalidCurrency && pathname !== "/onboarding/currency") {
        navigate("/onboarding/currency")
      } else if (invalidCurrency && pathname == "/onboarding/currency") {
        // DO NOTHING
      } else if (noPayoutInfo && pathname !== "/onboarding/payment") {
        navigate("/onboarding/payment")
      } else if (noPayoutInfo && pathname == "/onboarding/payment") {
        // DO NOTHING
      } else if (noLocation && pathname !== "/onboarding/location") {
        navigate("/onboarding/location")
      } else if (noLocation && pathname == "/onboarding/location") {
        // DO NOTHING
      } else {
        navigate(loc ?? "/")
      }
    }
  }, [shop, noLocation, noPayoutInfo, invalidCurrency])

  return {
    invalidCurrency,
    noLocation,
    noPayoutInfo,
  }
}
