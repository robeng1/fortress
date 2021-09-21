import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingsState = (state: RootState) => state.settings;
const inventoryState = (state: RootState) => state.inventory;

export const selectShopId = createSelector(
  [settingsState],
  settings => settings?.shop.shop_id || '',
);

export const selectNextPageToken = createSelector(
  [inventoryState],
  inventory => inventory?.nextPageToken || '',
);
