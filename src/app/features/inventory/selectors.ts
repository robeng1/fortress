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
export const selectOffset = createSelector(
  [inventoryState],
  d => d?.offset || 1,
);
export const selectCount = createSelector(
  [inventoryState],
  d => d?.num_per_page || 20,
);

export const selectRecordViews = createSelector(
  [inventoryState],
  d => d?.views || [],
);

export const selectHasRecords = createSelector(
  [selectRecordViews],
  d => d && d.length > 0,
);

export const selectRecordById = (
  state: RootState,
  productId: string,
  variantId: string,
  centreId: string,
) => state.inventory?.stock_records[productId][variantId][centreId] || {};

export const selectLocations = createSelector(
  [inventoryState],
  inv => inv?.locations,
);

export const selectLocationById = (state: RootState, centreId: string) =>
  state.inventory?.locations[centreId];
export const selectionLocations = createSelector(
  [inventoryState],
  inv => inv?.locations,
);
