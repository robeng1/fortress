import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const orderState = (state: RootState) => state.order;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectOffset = createSelector([orderState], d => d?.offset || 1);
export const selectCount = createSelector(
  [orderState],
  d => d?.num_per_page || 20,
);

export const selectOrderViews = createSelector(
  [orderState],
  d => d?.views || [],
);

export const selectHasOrders = createSelector(
  [selectOrderViews],
  d => d && d.length > 0,
);

export const selectNextPageToken = createSelector(
  [orderState],
  orders => orders?.nextPageToken || '',
);

export const selectOrderById = (state: RootState, orderId: string) =>
  state.order?.orders[orderId];
