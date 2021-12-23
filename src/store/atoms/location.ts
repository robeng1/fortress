import { fortressURL } from 'app/endpoints/urls';
import {
  LocationListType,
  LocationType,
} from 'app/models/inventory/inventory-type';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from './shop';

const initialState: LocationType[] = [];
export const syncedLocationsAtom = atomWithQuery<LocationType[], ResponseError>(
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
