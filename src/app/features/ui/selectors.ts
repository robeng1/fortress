import { PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { Err } from './type';
// import { initialState } from '.';

// First select the relevant part from the state
// const uiState = (state: RootState) => state.ui || initialState;
// const returnIfLoadingArgs = (state: RootState, ...actionsToCheck: string[]) =>
//   actionsToCheck;

// const returnIfRefreshingArgs = (state: RootState, actionToCheck: string) =>
//   actionToCheck;

// export const checkIfLoading = createSelector(
//   [uiState, returnIfLoadingArgs],
//   (ui, actionsToCheck) =>
//     ui.loader.actions.some((action: PayloadAction<any>) =>
//       actionsToCheck.includes(action.type),
//     ),
// );

// export const checkIfRefreshing = createSelector(
//   [uiState, returnIfRefreshingArgs],
//   (ui, actionToCheck) =>
//     ui?.loader.actions.some(
//       (action: PayloadAction<any>) => actionToCheck === action.type,
//     ),
// );
export const checkIfLoading = (state: RootState, ...actionsToCheck: string[]) =>
  state.ui?.loader.actions.some((action: PayloadAction<any>) =>
    actionsToCheck.includes(action.type),
  );

export const checkIfRefreshing = (state: RootState, actionToCheck: string) =>
  state.ui?.loader.refreshes.some(
    (action: PayloadAction<any>) => actionToCheck === action.type,
  );

export const checkIfHasError = (state: RootState, actionToCheck: string) =>
  state.ui?.loader.errors.some(
    (action: Err) => actionToCheck === action.action.type,
  );
