import { useQuery } from 'react-query';
import { ShopType } from 'models/settings/shop-type';
import { fortressURL } from 'endpoints/urls';
import { request } from 'utils/request';
import { useAtom } from 'jotai';
import { accountIdAtom } from 'store/authorization-atom';

const findShop = async (accountId: any) => {
  try {
    const shopResp: ShopType = await request(
      `${fortressURL}/accounts/${accountId}/shops`,
    );
    return shopResp;
  } catch (e) {
    return {};
  }
};

export default function useShop() {
  const [id] = useAtom(accountIdAtom);
  const {
    data: shop,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<ShopType>(['shop', id], () => findShop(id), {
    enabled: !!id,
    staleTime: 3600000,
  });
  return {
    refetch,
    shop,
    isLoading,
    isIdle,
    isRefetching,
  };
}
