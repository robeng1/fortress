import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const selectUser = (state: RootState) => state?.authn;
const selectSettings = (state: RootState) => state.settings;

export const selectUserId = createSelector(
  [selectUser],
  user => user?.profile.account_id || '',
);

export const selectShop = createSelector(
  [selectSettings],
  settings => settings?.shop || {},
);
