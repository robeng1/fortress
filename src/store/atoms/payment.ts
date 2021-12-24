import { paymentURL } from 'app/endpoints/urls';
import { Account } from 'app/models/payment/account-type';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from './shop';
const initialState: Account = {};

export const syncedAccountAtom = atomWithQuery<Account, ResponseError>(get => ({
  queryKey: ['account', get(shopIdAtom)],
  queryFn: async ({ queryKey: [, shopId] }) => {
    const resp: Account[] = await request(`${paymentURL}/${shopId}/accounts`);
    if (resp.length >= 1) {
      return resp[0];
    }
    return initialState;
  },
  initialData: initialState,
  keepPreviousData: true,
  enabled: !!get(shopIdAtom),
}));
