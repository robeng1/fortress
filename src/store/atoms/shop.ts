import { ShopType } from 'app/models/settings/shop-type';
import { atomWithStorage } from 'jotai/utils';
import { SHOP } from 'lib/contants';

export const initialState: ShopType = {};
export const shopAtom = atomWithStorage(SHOP, initialState);
