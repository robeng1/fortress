import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const authnState = (state: RootState) => state?.authn || initialState;

export const selectUserId = createSelector(
  [authnState],
  auth => auth?.profile.account_id,
);

export const selectIsAuthenticated = createSelector(
  [authnState],
  auth => auth?.isAuthenticated,
);

export const selectProfile = createSelector(
  [authnState],
  auth => auth?.profile,
);
