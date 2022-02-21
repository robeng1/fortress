import { paymentURL } from 'endpoints/urls';
import { Account } from 'models/payment/account-type';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from 'store/shop';
const initialState: Account = {};

export const paymentAccountAtom = atomWithQuery<Account, ResponseError>(get => ({
  queryKey: ['account', get(shopIdAtom)],
  queryFn: async ({ queryKey: [, shopId] }) => {
    try {
      const resp = await request(`${paymentURL}/${shopId}/accounts`);
      const accounts: Account[] = resp?.accounts
      if (accounts.length >= 1) {
        return accounts[0];
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
