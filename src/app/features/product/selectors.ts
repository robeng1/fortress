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
