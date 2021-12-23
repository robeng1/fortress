import { LocationType } from 'app/models/inventory/inventory-type';
import { atomWithStorage } from 'jotai/utils';
import { LOCATIONS } from 'lib/contants';

const initialState: LocationType[] = [];
export const locationsAtom = atomWithStorage(LOCATIONS, initialState);
