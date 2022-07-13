import { request, ResponseError } from "utils/request"
import { useQuery } from "react-query"
import useShop from "./use-shop"
import { WebApp } from "typings/app/dto"
import { fortressURL } from "endpoints/urls"
import { ShopApp } from "typings/app"
import { PageTemplate } from "typings/theme/types"
import { base64Decode } from "utils/buff"

const initialState = null

const fetchApps = async (id?: string): Promise<ShopApp | null> => {
  try {
    const resp = await request(`${fortressURL}/shops/${id}/webapps`)
    const apps: WebApp[] = resp?.webapps
    if (apps.length >= 0) {
      return { ...apps[0], template: base64Decode(apps[0].template) as PageTemplate }
    }
    return initialState
  } catch (error) {
    return initialState
  }
}

export default function useWebApp() {
  const { shop } = useShop()
  const shopId = shop?.shop_id
  const {
    data: app,
    refetch,
    isLoading: isLoadingApp,
    isIdle,
    isRefetching,
  } = useQuery<ShopApp | null>(["webapp", shopId], () => fetchApps(shopId), {
    enabled: !!shopId && shopId != undefined,
    keepPreviousData: true,
  })
  return {
    refetch,
    app,
    isLoadingApp,
    isIdle,
    isRefetching,
  }
}
