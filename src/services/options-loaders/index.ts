import { fortressURL } from 'endpoints/urls';
import { request } from 'utils/request';

export const collectionOptions =
  (shopId: string) => async (term: string, callback) => {
    const response = await fetch(
      `${fortressURL}/shops/${shopId}/collections/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id: shopId, term, type: 'collection' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    callback(responseJSON.result);
  };

export const filterCollectionsAsOptions = async (
  shopId: string,
  ids: string[],
) => {
  const resp = await request(
    `${fortressURL}/shops/${shopId}/collections/as-options`,
    {
      method: 'POST',
      body: JSON.stringify({ shop_id: shopId, id_list: [...ids] }),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  return resp?.result || [];
};

export const productOptions =
  (shop_id: string) => async (term: string, callback) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/products/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'product' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    callback(responseJSON.result);
  };

export const discountOptions =
  (shop_id: string) => async (term: string, callback) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/discounts/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'discount' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    callback(responseJSON.result);
  };

export const tagOptions =
  (shop_id: string) => async (term: string, callback) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/tags/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'tag' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    callback(responseJSON.result);
  };

export const productTypeOptions = async (term: string, callback) => {
  const response = await fetch(
    `${fortressURL}/shops/product-types/option-search`,
    {
      method: 'POST',
      body: JSON.stringify({ term }),
      headers: { 'Content-Type': 'application/json' },
    },
  );
  const responseJSON = await response.json();
  callback(responseJSON.result);
};
