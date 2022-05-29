import { fortressURL } from "endpoints/urls"
import isEmpty from "lodash/isEmpty"
import { useQuery } from "react-query"
import { request } from "utils/request"
import useShop from "./use-shop"

export function useHasSale() {
  const { shop } = useShop()
  const query = `SELECT * FROM "order" WHERE shop_id = '${shop?.shop_id}' ORDER BY updated_at DESC LIMIT 1`
  const { data, isLoading } = useQuery(
    ["orderviews", "sale-check"],
    async () => {
      try {
        const views = await request(
          `${fortressURL}/shops/${shop?.shop_id}/order-views`,
          {
            method: "POST",
            body: JSON.stringify(query),
            headers: { "Content-Type": "application/json" },
          }
        )
        return views
      } catch (error) {}
    },

    { keepPreviousData: true, enabled: !!shop?.shop_id }
  )
  const hasSale = isLoading || !shop || !isEmpty(data?.orders)
  return hasSale
}
