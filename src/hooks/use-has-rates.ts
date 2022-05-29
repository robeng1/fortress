import useRates from "./use-rates"

export default function useHasRates() {
  const { hasRates } = useRates()
  return {
    hasRates,
  }
}
