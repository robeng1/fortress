import { fortressURL } from 'app/endpoints/urls';
import type { GroupBase, OptionsOrGroups } from 'react-select';

export const loadCollectionsAsOptions =
  (shopId: string) =>
  async (
    searchQuery: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    let query = `SELECT * FROM collection WHERE shop_id = '${shopId}'`;
    if (searchQuery !== '') {
      query = `SELECT * FROM collection WHERE shop_id = '${shopId}' AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/collections/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    console.log(responseJSON);
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
      // additional: {
      //   page: searchQuery ? 2 : page + 1,
      // },
    };
  };

export const loadProductsAsOptions =
  (shopId: string) =>
  async (
    searchQuery: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    let query = `SELECT * FROM product WHERE shop_id = '${shopId}'`;
    if (searchQuery !== '') {
      query = `SELECT * FROM product WHERE shop_id = '${shopId}' AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/products/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
      // additional: {
      //   page: searchQuery ? 2 : page + 1,
      // },
    };
  };
export const loadDiscountsAsOptions =
  (shopId: string) =>
  async (
    searchQuery: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    let query = `SELECT * FROM discount WHERE shop_id = '${shopId}'`;
    if (searchQuery !== '') {
      query = `SELECT * FROM discount WHERE shop_id = '${shopId}' AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }
    const response = await fetch(
      `${fortressURL}/shops/${shopId}/discounts/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
      // additional: {
      //   page: searchQuery ? 2 : page + 1,
      // },
    };
  };

export const loadTagsAsOptions =
  (shopId: string) =>
  async (
    searchQuery: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    let query = `SELECT * FROM tag WHERE shop_id = '${shopId}'`;
    if (searchQuery !== '') {
      query = `SELECT * FROM tag WHERE shop_id = '${shopId}' AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/tags/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
        headers: { 'Content-Type': 'application/json' },
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON.result,
      hasMore: responseJSON.length >= 1,
      // additional: {
      //   page: searchQuery ? 2 : page + 1,
      // },
    };
  };

export const loadProductTypesAsOptions = async (
  searchQuery: string,
  prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
) => {
  let query = `SELECT * FROM product_type `;
  if (searchQuery !== '') {
    query = `SELECT * FROM product_type WHERE TEXT_MATCH(search_col, '${searchQuery}')`;
  }
  const response = await fetch(`${fortressURL}/product-types/option-search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' },
  });
  const responseJSON = await response.json();
  return {
    options: responseJSON.result,
    hasMore: responseJSON.length >= 1,
    // additional: {
    //   page: searchQuery ? 2 : page + 1,
    // },
  };
};
