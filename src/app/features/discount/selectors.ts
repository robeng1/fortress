import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const discountState = (state: RootState) => state.discount;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectNextPageToken = createSelector(
  [discountState],
  discounts => discounts?.nextPageToken || '',
);
