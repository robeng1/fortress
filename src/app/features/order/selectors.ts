import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const orderState = (state: RootState) => state.order;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectNextPageToken = createSelector(
  [orderState],
  orders => orders?.nextPageToken || '',
);
