import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import isEqual from 'lodash/isEqual';
import { Err } from './type';

const uiNamespace = 'ui';

export type UIState = {
  loader: {
    actions: PayloadAction<any>[];
    refreshes: PayloadAction<any>[];
    errors: Err[];
  };
};

export const initialState: UIState = {
  loader: {
    actions: [],
    refreshes: [],
    errors: [],
  },
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: uiNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    startAction: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.actions = [...state.loader.actions, trackedAction];
    },
    stopAction: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.actions = state.loader.actions.filter(
        act =>
          act.type !== trackedAction.type &&
          !isEqual(act.payload, trackedAction.payload),
      );
    },
    startRefreshing: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.refreshes = [...state.loader.refreshes, trackedAction];
    },
    stopRefreshing: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.refreshes = state.loader.refreshes.filter(
        act =>
          act.type !== trackedAction.type &&
          !isEqual(act.payload, trackedAction.payload),
      );
    },
    actionFailed: (state, action: PayloadAction<Err>) => {
      const failedAction = action.payload;
      state.loader.errors = [...state.loader.errors, failedAction];
    },

    actionSucceeded: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.errors = state.loader.errors.filter(
        act =>
          act?.action?.type !== trackedAction.type &&
          !isEqual(act?.action?.payload, trackedAction.payload),
      );
    },
    clearError: (state, action: PayloadAction<PayloadAction<any>>) => {
      const trackedAction = action.payload;
      state.loader.errors = state.loader.errors.filter(
        act => act?.action?.type !== trackedAction.type,
      );
    },
  },
});

export const { actions: uiActions, reducer } = slice;

export const useUISlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
