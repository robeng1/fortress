import { fortressURL } from 'endpoints/urls';
import {
  ItemBasedRateType,
  ItemBasedRateListType,
} from 'typings/rates/item-based-rate';
import {
  WeightBasedRateType,
  WeightBasedRateListType,
} from 'typings/rates/weight-based-rate';
import { useQuery } from 'react-query';
import { request } from 'utils/request';
import useShop from './use-shop';

type Rate = WeightBasedRateType & ItemBasedRateType;

const initialState: Rate[] = [];

const findWbrs = async (id?: string) => {
  try {
    const resp: WeightBasedRateListType = await request(
      `${fortressURL}/shops/${id}/wbrs`,
    );
    return resp?.rates || initialState;
  } catch (e) {
    return initialState;
  }
};

const findIbrs = async (id?: string) => {
  try {
    const resp: ItemBasedRateListType = await request(
      `${fortressURL}/shops/${id}/ibrs`,
    );
    return resp?.rates || initialState;
  } catch (e) {
    return initialState;
  }
};

export default function useRates() {
  const { shop } = useShop();
  const { data: wbrates } = useQuery<WeightBasedRateType[]>(
    ['weight-based-rates', shop?.shop_id],
    () => findWbrs(shop?.shop_id),
    {
      enabled: !!shop?.shop_id,
    },
  );
  const { data: ibrates } = useQuery<ItemBasedRateType[]>(
    ['item-based-rates', shop?.shop_id],
    () => findIbrs(shop?.shop_id),
    {
      enabled: !!shop?.shop_id,
      keepPreviousData: true,
    },
  );
  const rates: Rate[] = (wbrates ?? initialState).concat(
    ibrates || initialState,
  );
  return {
    rates,
  };
}
