import { ShopType } from 'app/models/settings/shop-type';
import { atomWithStorage, selectAtom } from 'jotai/utils';
import { SHOP } from 'lib/contants';

export const initialState: ShopType = {};
export const shopAtom = atomWithStorage(SHOP, initialState);
export const shopIdAtom = selectAtom(shopAtom, shop => shop.shop_id);
