import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const productState = (state: RootState) => state.product;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectNextPageToken = createSelector(
  [productState],
  products => products?.nextPageToken || '',
);

export const selectOffset = createSelector([productState], d => d?.offset || 1);
export const selectCount = createSelector(
  [productState],
  d => d?.num_per_page || 20,
);

export const selectProductViews = createSelector(
  [productState],
  d => d?.views || [],
);

export const selectHasProducts = createSelector(
  [selectProductViews],
  d => d && d.length > 0,
);

export const selectProductById = (state: RootState, productId: string) =>
  state.product?.products[productId];
