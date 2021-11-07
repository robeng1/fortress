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

export const selectOffset = createSelector(
  [discountState],
  d => d?.offset || 1,
);
export const selectCount = createSelector(
  [discountState],
  d => d?.num_per_page || 20,
);

export const selectDiscountViews = createSelector(
  [discountState],
  d => d?.views || [],
);

export const selectHasDiscounts = createSelector(
  [selectDiscountViews],
  d => d && d.length > 0,
);

export const selectDiscountById = (state: RootState, discountId: string) =>
  state.discount?.discounts[discountId];
