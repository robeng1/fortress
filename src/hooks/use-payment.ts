import { paymentURL } from 'endpoints/urls';
import { Account } from 'models/payment/account-type';
import { request, ResponseError } from 'utils/request';
import { useQuery } from 'react-query';
import useShop from './use-shop';
const initialState: Account = {};

const getPd = async (id?: string) => {
  try {
    const resp = await request(`${paymentURL}/${id}/accounts`);
    const accounts: Account[] = resp?.accounts;
    if (accounts.length >= 1) {
      return accounts[0];
    }
    return initialState;
  } catch (error) {
    return initialState;
  }
};

export default function usePayment() {
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const {
    data: paymentAccount,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<Account>(['payment', shopId], () => getPd(shopId), {
    enabled: !!shopId,
  });
  return {
    refetch,
    paymentAccount,
    isLoading,
    isIdle,
    isRefetching,
  };
}