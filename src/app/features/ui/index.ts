import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import isEqual from 'lodash/isEqual';

const uiNamespace = 'ui';

export type UIState = {
  loader: {
    actions: PayloadAction<any>[];
    refreshes: PayloadAction<any>[];
  };
};

export const initialState: UIState = {
  loader: {
    actions: [],
    refreshes: [],
  },
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: uiNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    startAction: (state, action: PayloadAction<any>) => {
      const { actions } = state.loader;
      state.loader.actions = [...actions, action];
    },
    stopAction: (state, action: PayloadAction<any>) => {
      const { actions } = state.loader;
      state.loader.actions = actions.filter(
        act =>
          act.type !== action.type && !isEqual(act.payload, action.payload),
      );
    },
    startRefreshing: (state, action: PayloadAction<any>) => {
      const { refreshes } = state.loader;
      state.loader.refreshes = [...refreshes, action];
    },
    stopRefreshing: (state, action: PayloadAction<any>) => {
      const { refreshes } = state.loader;
      state.loader.refreshes = refreshes.filter(
        act =>
          act.type !== action.type && !isEqual(act.payload, action.payload),
      );
    },
  },
});

export const { actions: uiActions, reducer } = slice;

export const useUISlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
