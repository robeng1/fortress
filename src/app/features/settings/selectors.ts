import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const selectUser = (state: RootState) => state?.authn;
const selectSettings = (state: RootState) => state.settings;

export const selectUserId = createSelector(
  [selectUser],
  authn => authn?.session?.identity?.account_id || '',
);

export const selectShop = createSelector(
  [selectSettings],
  settings => settings?.shop || {},
);

export const selectShopName = createSelector(
  [selectSettings],
  settings => settings?.shop?.business_display_name || 'Demo',
);
