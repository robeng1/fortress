import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const selectUser = (state: RootState) => state?.user;

export const selectUserId = createSelector(
  [selectUser],
  user => user?.profile.account_id || '',
);
