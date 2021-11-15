import { fortressURL } from 'app/endpoints/urls';
import type { GroupBase, OptionsOrGroups } from 'react-select';

export const loadCollectionsAsOptions =
  (shopId: string) =>
  async (
    searchQuery: string,
    prevOptions: OptionsOrGroups<unknown, GroupBase<unknown>>,
  ) => {
    let query = `SELECT * FROM collections WHERE shop_id = ${shopId}`;
    if (searchQuery !== '') {
      query = `SELECT * FROM collections WHERE shop_id = ${shopId} AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/collections/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON,
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
    let query = `SELECT * FROM products WHERE shop_id = ${shopId}`;
    if (searchQuery !== '') {
      query = `SELECT * FROM products WHERE shop_id = ${shopId} AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/products/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON,
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
    let query = `SELECT * FROM discounts WHERE shop_id = ${shopId}`;
    if (searchQuery !== '') {
      query = `SELECT * FROM discounts WHERE shop_id = ${shopId} AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }
    const response = await fetch(
      `${fortressURL}/shops/${shopId}/discounts/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON,
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
    let query = `SELECT * FROM tags WHERE shop_id = ${shopId}`;
    if (searchQuery !== '') {
      query = `SELECT * FROM tags WHERE shop_id = ${shopId} AND TEXT_MATCH(search_col, '${searchQuery}')`;
    }

    const response = await fetch(
      `${fortressURL}/shops/${shopId}/tags/option-search`,
      {
        method: 'POST',
        body: JSON.stringify({ query }),
      },
    );
    const responseJSON = await response.json();
    return {
      options: responseJSON,
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
  let query = `SELECT * FROM product_types `;
  if (searchQuery !== '') {
    query = `SELECT * FROM product_types WHERE TEXT_MATCH(search_col, '${searchQuery}')`;
  }
  const response = await fetch(`${fortressURL}/product-types/option-search`, {
    method: 'POST',
    body: JSON.stringify({ query }),
  });
  const responseJSON = await response.json();
  return {
    options: responseJSON,
    hasMore: responseJSON.length >= 1,
    // additional: {
    //   page: searchQuery ? 2 : page + 1,
    // },
  };
};
