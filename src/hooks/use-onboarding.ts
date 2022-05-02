import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useCentres from "./use-location";
import usePayment from "./use-payment";
import useShop from "./use-shop";

export function useOnboarding() {
  const { shop } = useShop();
  const { locations } = useCentres();
  const { shopAccount } = usePayment();
  let invalidCurrency = false
  if (!shop?.currency) {
    invalidCurrency = true
  }
  let noLocation = false
  if (!locations || locations.length === 0) {
    noLocation = true
  }
  let noPayoutInfo = false
  if (!shopAccount) {
    noPayoutInfo = true
  }
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (invalidCurrency && !pathname.includes('onboarding/currency')) {
      navigate('/onboarding/currency')
    } else if (noPayoutInfo && !pathname.includes('onboarding/payment')) {
      navigate('/onboarding/payment')
    } else if (noLocation && !pathname.includes('onboarding/location')) {
      navigate('/onboarding/location')
    }
  }, [noLocation, noPayoutInfo, invalidCurrency])

  return {
    invalidCurrency,
    noLocation,
    noPayoutInfo
  }
}