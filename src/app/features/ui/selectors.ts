import { createSelector, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const uiState = (state: RootState) => state?.ui;
const checkIfLoadingReturner = (
  state: RootState,
  ...actionsToCheck: string[]
) => actionsToCheck;

const checkIfRefreshingReturner = (state: RootState, actionToCheck: string) =>
  actionToCheck;

export const checkIfLoading = createSelector(
  [uiState, checkIfLoadingReturner],
  (ui, actionsToCheck) =>
    ui?.loader.actions.some((action: PayloadAction<any>) =>
      actionsToCheck.includes(action.type),
    ),
);

export const checkIfRefreshing = createSelector(
  [uiState, checkIfRefreshingReturner],
  (ui, actionToCheck) =>
    ui?.loader.actions.some(
      (action: PayloadAction<any>) => actionToCheck === action.type,
    ),
);
