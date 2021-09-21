import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const collectionState = (state: RootState) => state.collection;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectCollections = createSelector(
  [collectionState],
  collections => collections?.collections || {},
);

export const selectCollectionsNextPageToken = createSelector(
  [collectionState],
  collections => collections?.collectionsNextPageToken || '',
);
