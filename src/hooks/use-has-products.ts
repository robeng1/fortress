import { request, ResponseError } from "utils/request"
import { useQuery } from "react-query"
import useShop from "./use-shop"
import { fortressURL } from "endpoints/urls"
import { ProductViewListType } from "typings/product/product-type"
import { useEffect, useState } from "react"

export default function useHasProducts() {
  const [hasItems, setHasItems] = useState<boolean>(true)
  const { shop } = useShop()
  const url = `${fortressURL}/shops/${shop?.shop_id}/product-views`
  const body = {
    offset: 0,
    limit: 1,
    shop_id: shop?.shop_id,
  }
  const { data: productData, isLoading: productCheckIsLoading } = useQuery<
    ProductViewListType,
    ResponseError
  >(
    ["has-productview", "has-product"],
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
  useEffect(() => {
    if (shop && productData) {
      setHasItems(!!(productData?.products && productData.products.length > 0))
    }
  }, [shop, productCheckIsLoading, productData])

  return {
    hasProduct: hasItems,
    productCheckIsLoading,
  }
}
