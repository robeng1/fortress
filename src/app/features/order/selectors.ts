import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const selectSettings = (state: RootState) => state.settings;

export const selectShopID = createSelector(
  [selectSettings],
  settings => settings?.shop.shop_id || '',
);
