import { request, ResponseError } from "utils/request"
import isEmpty from "lodash/isEmpty"
import { useQuery } from "react-query"
import useShop from "./use-shop"
import { fortressURL } from "endpoints/urls"
import { DiscountListType } from "typings/discount/discount-type"

export default function useDiscountViews(
  page: number,
  itemsPerPage: number,
  term = ""
) {
  const { shop } = useShop()
  const url = isEmpty(term)
    ? `${fortressURL}/shops/${shop?.shop_id}/offer-views`
    : `${fortressURL}/shops/${shop?.shop_id}/offer-views/search`
  const body = {
    offset: (page - 1) * itemsPerPage + 1,
    limit: itemsPerPage,
    shop_id: shop?.shop_id,
  }
  if (term && term != "") {
    body["term"] = term
  }
  const { data: discountData, isLoading } = useQuery<
    DiscountListType,
    ResponseError
  >(
    ["discountviews", page, term],
    async () =>
      await request(`${url}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!shop?.shop_id,
    }
  )

  return {
    discountData,
    isLoading,
  }
}
