import { fortressURL } from 'endpoints/urls';
import { WebAnalyticResponseBody } from 'typings/stats/stats-type';
import { useQuery } from 'react-query';
import { request } from 'utils/request';
import useShop from './use-shop';

export function useStats() {
  const { shop } = useShop();
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/stats`;

  const { data: webStats, isLoading: statsIsLoading } =
    useQuery<WebAnalyticResponseBody>(
      ['web-analytics'],
      async () => await request(`${requestURL}`),
      { enabled: !!shop?.shop_id },
    );
  return {
    webStats,
    statsIsLoading,
  };
}
