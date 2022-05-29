import { fortressURL } from "endpoints/urls"
import { useMutation } from "react-query"
import { ProductImage } from "typings/product/product-type"
import { request, ResponseError } from "utils/request"
import useShop from "./use-shop"

export function useDeleteImage() {
  const { shop } = useShop()
  const { mutateAsync } = useMutation(
    (url: string) =>
      request(url, {
        method: "DELETE",
      }),
    {
      onSuccess: (resp: Record<string, any>) => {},
      onError: (e: ResponseError) => {},
    }
  )
  const deleteUpload = (image: any) => {
    const upload = image as ProductImage
    const requestURL = `${fortressURL}/shops/${shop?.shop_id}/products/${upload.product_id}/images/${upload.image_id}`
    mutateAsync(requestURL)
  }

  return {
    deleteUpload,
  }
}
