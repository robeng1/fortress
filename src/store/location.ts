import { fortressURL } from 'endpoints/urls';
import {
  LocationListType,
  LocationType,
} from 'models/inventory/inventory-type';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from 'store/shop';

const initialState: LocationType[] = [];
export const locationsAtom = atomWithQuery<LocationType[], ResponseError>(
  get => ({
    queryKey: ['locations', get(shopIdAtom)],
    queryFn: async ({ queryKey: [, shopId] }) => {
      const resp: LocationListType = await request(
        `${fortressURL}/shops/${shopId}/centres`,
      );
      return resp?.stores || initialState;
    },
    initialData: initialState,
    keepPreviousData: true,
    enabled: !!get(shopIdAtom),
  }),
);
