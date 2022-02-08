import { fortressURL } from 'endpoints/urls';
import { ShopType } from 'models/settings/shop-type';
import { atomWithQuery } from 'jotai/query';
import { selectAtom } from 'jotai/utils';
import { request, ResponseError } from 'utils/request';
import { accountIdAtom } from 'store/authorization-atom';

export const initialState: ShopType = {};
export const shopAtom = atomWithQuery<ShopType, ResponseError>(get => ({
  queryKey: ['shop', get(accountIdAtom)],
  queryFn: async ({ queryKey: [, accountId] }) => {
    const resp: ShopType = await request(
      `${fortressURL}/accounts/${accountId}/shops`,
    );
    return resp || initialState;
  },
  initialData: initialState,
  keepPreviousData: true,
  enabled: !!get(accountIdAtom),
}));

export const shopIdAtom = selectAtom(shopAtom, shop => shop?.shop_id);
