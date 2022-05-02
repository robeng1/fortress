import useCentres from "./use-location";
import usePayment from "./use-payment";
import useShop from "./use-shop";

export function useUnboarding() {
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
  return {
    invalidCurrency,
    noLocation,
    noPayoutInfo
  }
}