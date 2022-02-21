import { paymentURL } from 'endpoints/urls';
import { Account } from 'models/payment/account-type';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from 'store/shop';
const initialState: Account = {};

export const accountAtom = atomWithQuery<Account, ResponseError>(get => ({
  queryKey: ['account', get(shopIdAtom)],
  queryFn: async ({ queryKey: [, shopId] }) => {
    try {
      const resp: Account[] = await request(`${paymentURL}/${shopId}/accounts`);
      if (resp.length >= 1) {
        return resp[0];
      }
      return initialState;
    } catch (error) {
      return initialState;
    }
  },
  initialData: initialState,
  keepPreviousData: true,
  enabled: !!get(shopIdAtom),
}));
