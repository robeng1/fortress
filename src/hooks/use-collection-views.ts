import { request, ResponseError } from 'utils/request';
import isEmpty from "lodash/isEmpty"
import { useQuery } from 'react-query';
import useShop from './use-shop';
import { fortressURL } from 'endpoints/urls';
import { CollectionViewListType } from 'typings/collection/collection-type';

export default function useCollectionViews(page: number, itemsPerPage: number, term = '') {
  const { shop } = useShop();
  const url = isEmpty(term) ? `${fortressURL}/shops/${shop?.shop_id}/collection-views` : `${fortressURL}/shops/${shop?.shop_id}/collection-views/search`
  const body = {
    offset: (page - 1) * itemsPerPage + 1,
    limit: itemsPerPage,
    shop_id: shop?.shop_id,
  }
  if (term && term != "") {
    body["term"] = term
  }
  const { data: collectionData, isLoading } = useQuery<CollectionViewListType, ResponseError>(
    ['collectionviews', page, term],
    async () =>
      await request(`${url}`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!shop?.shop_id,
    },
  );

  return {
    collectionData,
    isLoading
  }
}
