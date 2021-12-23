import { fortressURL } from 'app/endpoints/urls';
import { LocationType } from 'app/models/inventory/inventory-type';
import { atomWithQuery } from 'jotai/query';
import { atomWithStorage } from 'jotai/utils';
import { LOCATIONS } from 'lib/contants';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from './shop';

const initialState: LocationType[] = [];
export const locationsAtom = atomWithStorage(LOCATIONS, initialState);

export const syncedLocationsAtom = atomWithQuery<LocationType[], ResponseError>(
  get => ({
    queryKey: ['locations', get(shopIdAtom)],
    queryFn: async ({ queryKey: [, shopId] }) => {
      return await request(`${fortressURL}/shops/${shopId}/centres`);
    },
    keepPreviousData: true,
    enabled: !!get(shopIdAtom),
  }),
);
