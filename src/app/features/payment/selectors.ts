import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const selectUser = (state: RootState) => state?.authn;
const selectPayment = (state: RootState) => state?.payment;

export const selectUserID = createSelector(
  [selectUser],
  user => user?.profile.account_id || '',
);

export const selectPaymentAccount = createSelector(
  [selectPayment],
  p => p?.account || {},
);
