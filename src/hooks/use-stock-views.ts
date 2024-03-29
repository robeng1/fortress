import { request, ResponseError } from "utils/request"
import { useQuery } from "react-query"
import isEmpty from "lodash/isEmpty"
import useShop from "./use-shop"
import { fortressURL } from "endpoints/urls"
import {
  InventoryViewListType,
  InventoryViewType,
} from "typings/inventory/inventory-type"

export default function useStockView(
  page: number,
  itemsPerPage: number,
  term = ""
) {
  const { shop } = useShop()
  const url = isEmpty(term)
    ? `${fortressURL}/shops/${shop?.shop_id}/inventory-views`
    : `${fortressURL}/shops/${shop?.shop_id}/inventory-views/search`
  const body = {
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    shop_id: shop?.shop_id,
  }
  if (term && term != "") {
    body["term"] = term
  }
  const { data, isLoading } = useQuery<InventoryViewListType, ResponseError>(
    ["inventoryviews", page, term],
    async () =>
      await request(`${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }),
    {
      keepPreviousData: true,
      enabled: !!shop?.shop_id,
    }
  )

  return {
    data,
    isLoading,
  }
}
