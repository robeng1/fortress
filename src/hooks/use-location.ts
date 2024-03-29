import { fortressURL } from "endpoints/urls"
import {
  LocationListType,
  LocationType,
} from "typings/inventory/inventory-type"
import { request, ResponseError } from "utils/request"
import { useQuery } from "react-query"
import useShop from "./use-shop"
const initialState: LocationType[] = []
const findLocations = async (id?: string) => {
  try {
    const resp: LocationListType = await request(
      `${fortressURL}/shops/${id}/centres`
    )
    return resp?.stores || initialState
  } catch (e) {
    return []
  }
}

export default function useCentres() {
  const { shop } = useShop()
  const {
    data: locations,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<LocationType[]>(
    ["locations", shop?.shop_id],
    () => findLocations(shop?.shop_id),
    {
      enabled: !!shop?.shop_id,
      keepPreviousData: true,
    }
  )
  return {
    refetch,
    locations,
    isLoading,
    isIdle,
    isRefetching,
  }
}
