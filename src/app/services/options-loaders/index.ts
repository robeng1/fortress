import { fortressURL } from 'app/endpoints/urls';
import type { GroupBase, OptionsOrGroups } from 'react-select';

export const loadCollectionsAsOptions =
  (shopId: string) =>
  async (
    term: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    const response = await fetch(
      `${fortressURL}/shops/${shopId}/collections/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id: shopId, term, type: 'collection' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    let options = responseJSON.result;
    return {
      options: options,
      hasMore: true,
    };
  };

export const loadProductsAsOptions =
  (shop_id: string) =>
  async (
    term: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/products/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'product' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
    };
  };
export const loadDiscountsAsOptions =
  (shop_id: string) =>
  async (
    term: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/discounts/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'discount' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
    };
  };

export const loadTagsAsOptions =
  (shop_id: string) =>
  async (
    term: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    const response = await fetch(
      `${fortressURL}/shops/${shop_id}/tags/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ shop_id, term, type: 'tag' }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
    };
  };

export const loadProductTypesAsOptions = async (
  term: string,
  prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
) => {
  const response = await fetch(`${fortressURL}/product-types/option-search`, {
    method: 'POST',
    body: JSON.stringify({ term }),
    headers: { 'Content-Type': 'application/json' },
  });
  const responseJSON = await response.json();
  return {
    options: responseJSON.result,
    hasMore: responseJSON.length >= 1,
  };
};
