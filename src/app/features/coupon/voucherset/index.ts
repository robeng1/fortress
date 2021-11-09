import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  VoucherSetType,
  VoucherSetViewType,
} from 'app/models/voucher/voucherset';
import { VoucherSetErrorType } from './types';
import voucherSetSaga from './saga';

const voucherSetNamespace = 'voucherset';

export type VoucherSetState = {
  sets: { [key: string]: VoucherSetType };
  shard: number;
  offset: number;
  num_per_page: number;
  views: VoucherSetViewType[];
  count: number;
  error?: VoucherSetErrorType | null;
};

export const initialState: VoucherSetState = {
  sets: {},
  shard: 1,
  views: [],
  num_per_page: 20,
  offset: 0,
  count: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: voucherSetNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    getVoucherSet: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    createVoucherSet: (state, action: PayloadAction<VoucherSetType>) => {
      state.error = null;
    },
    updateVoucherSet: (state, action: PayloadAction<VoucherSetType>) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<VoucherSetViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'voucher_set_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    setVoucherSet: (state, action: PayloadAction<VoucherSetType>) => {
      state.sets = {
        ...state.sets,
        [action.payload.set_id]: action.payload,
      };
    },
    loadVoucherSets: state => {
      state.error = null;
    },
    voucherSetError(state, action: PayloadAction<VoucherSetErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: voucherSetActions, reducer } = slice;

export const useVoucherSetSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: voucherSetSaga });
  return { actions: slice.actions };
};
