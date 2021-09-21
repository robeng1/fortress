import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const userState = (state: RootState) => state?.user;

export const selectUserId = createSelector([userState], user => '');
