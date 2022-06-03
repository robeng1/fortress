import { request, ResponseError } from "utils/request"
import isEmpty from "lodash/isEmpty"
import { useQuery } from "react-query"
import useShop from "./use-shop"
import { fortressURL } from "endpoints/urls"
import { ProductViewListType } from "typings/product/product-type"

export default function useProductViews(
  page: number,
  itemsPerPage: number,
  term = ""
) {
  const { shop } = useShop()
  const url = isEmpty(term)
    ? `${fortressURL}/shops/${shop?.shop_id}/product-views`
    : `${fortressURL}/shops/${shop?.shop_id}/product-views/search`
  const body = {
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
    shop_id: shop?.shop_id,
  }
  if (term && term != "") {
    body["term"] = term
  }
  const { data: productData, isLoading } = useQuery<
    ProductViewListType,
    ResponseError
  >(
    ["productviews", page, term],
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
    productData,
    isLoading,
  }
}
