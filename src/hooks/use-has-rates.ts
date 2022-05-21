
import useRates from './use-rates';

export default function useHasRates() {
  const { rates } = useRates()
  const hasRates = rates.length > 0
  return {
    hasRates
  }
}
