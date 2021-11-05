import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const authnState = (state: RootState) => state?.authn;

export const selectUserId = createSelector(
  [authnState],
  auth => auth?.profile.account_id,
);

export const selectIsAuthenticated = createSelector(
  [authnState],
  auth => auth?.isAuthenticated,
);
export const selectIsLoading = createSelector(
  [authnState],
  auth => auth?.loading,
);
