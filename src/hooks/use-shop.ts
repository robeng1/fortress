import { useQuery } from 'react-query';
import { ShopType } from 'typings/settings/shop-type';
import { fortressURL } from 'endpoints/urls';
import { request } from 'utils/request';
import { useAtom } from 'jotai';
import { uidAtom } from 'store/authorization-atom';

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
  const [id] = useAtom(uidAtom);
  const {
    data: shop,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<ShopType>(['shop', id], () => findShop(id), {
    enabled: !!id,
    keepPreviousData: true,
  });
  return {
    refetch,
    shop,
    isLoading,
    isIdle,
    isRefetching,
  };
}
