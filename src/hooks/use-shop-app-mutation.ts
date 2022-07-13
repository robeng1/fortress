import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "react-query"
import { fortressURL } from "endpoints/urls"
import useShop from "./use-shop"
import { request, ResponseError } from "utils/request"
import { b64Encode, base64Decode } from "utils/buff"
import useWebApp from "./use-shop-app"
import { ShopApp } from "typings/app"
import { WebApp } from "typings/app/dto"

export function useShopAppMutation() {
  const qc = useQueryClient()
  const { shop } = useShop()
  const { app, isLoadingApp } = useWebApp()

  const { mutate: updateApp, isLoading: isUpdatingApp } = useMutation(
    (payload: WebApp) =>
      request(`${fortressURL}/shops/${shop?.shop_id}/webapps/${app?.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (updatedApp: WebApp) => {
        qc.setQueryData(["webapp"], { ...updateApp, template: base64Decode(updatedApp.template) })
        toast.success("Site updated successfully")
      },
      onError: (e: ResponseError) => {
        toast.error(e.message)
      },
    }
  )
  const update = (payload: ShopApp) => {
    updateApp({
      ...payload,
      template: b64Encode(payload.template)
    })
  }
  return {
    update,
    updateApp,
    isLoadingApp,
    isUpdatingApp,
    app,
  }
}
