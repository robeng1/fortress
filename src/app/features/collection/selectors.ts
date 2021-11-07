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

export const selectOffset = createSelector(
  [collectionState],
  d => d?.offset || 1,
);
export const selectCount = createSelector(
  [collectionState],
  d => d?.num_per_page || 20,
);

export const selectCollectionViews = createSelector(
  [collectionState],
  d => d?.views || [],
);

export const selectHasCollections = createSelector(
  [selectCollectionViews],
  d => d && d.length > 0,
);

export const selectCollectionById = (state: RootState, collectionId: string) =>
  state.collection?.collections[collectionId];
