import { fortressURL } from 'app/endpoints/urls';
import { atomWithQuery } from 'jotai/query';
import { request, ResponseError } from 'utils/request';
import { shopIdAtom } from 'store/shop';
import {
  WeightBasedRateListType,
  WeightBasedRateType,
} from 'app/models/rates/weight-based-rate';
import {
  ItemBasedRateListType,
  ItemBasedRateType,
} from 'app/models/rates/item-based-rate';
import { atom } from 'jotai';

type Rate = WeightBasedRateType & ItemBasedRateType;

const initialState: Rate[] = [];
const weightBasedRatesAtom = atomWithQuery<
  WeightBasedRateType[],
  ResponseError
>(get => ({
  queryKey: ['weight-based-rates', get(shopIdAtom)],
  queryFn: async ({ queryKey: [, shopId] }) => {
    const resp: WeightBasedRateListType = await request(
      `${fortressURL}/shops/${shopId}/wbrs`,
    );
    return resp?.rates || initialState;
  },
  initialData: initialState,
  keepPreviousData: true,
  enabled: !!get(shopIdAtom),
}));

const itemBasedRatesAtom = atomWithQuery<ItemBasedRateType[], ResponseError>(
  get => ({
    queryKey: ['item-based-rates', get(shopIdAtom)],
    queryFn: async ({ queryKey: [, shopId] }) => {
      const resp: ItemBasedRateListType = await request(
        `${fortressURL}/shops/${shopId}/ibrs`,
      );
      return resp?.rates || initialState;
    },
    initialData: initialState,
    keepPreviousData: true,
    enabled: !!get(shopIdAtom),
  }),
);

export const ratesAtom = atom<Rate[]>(get => {
  let rates: Rate[] = [];
  const ir = get(itemBasedRatesAtom);
  if (ir) {
    rates.push(...ir);
  }
  const wr = get(weightBasedRatesAtom);
  if (wr) {
    rates.push(...wr);
  }
  return rates;
});
