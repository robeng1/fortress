import { domainURL } from 'endpoints/urls';
import { DNSEntry } from 'typings/domains/domains';
import { useQuery } from 'react-query';
import { request } from 'utils/request';
import useShop from './use-shop';

const initialState: DNSEntry[] = [];

const getEntries = async (id?: string) => {
  try {
    const entries: DNSEntry[] = await request(
      `${domainURL}/shops/${id}/domains`,
    );

    return entries || initialState;
  } catch (error) {
    return initialState;
  }
};
export default function useDomains() {
  const { shop } = useShop();
  const shopId = shop?.shop_id;
  const {
    data: entries,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<DNSEntry[]>(['domains', shopId], () => getEntries(shopId), {
    enabled: !!shopId && shopId != undefined,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 2000,
  });
  return {
    entries,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  };
}
