import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { VoucherType, VoucherViewType } from 'app/models/voucher/voucher';
import { VoucherErrorType } from './types';
import voucherSaga from './saga';
import { objectify } from 'app/utils/utils';

const voucherNamespace = 'voucher';

export type VoucherState = {
  vouchers: { [key: string]: VoucherType };
  shard: number;
  offset: number;
  num_per_page: number;
  views: VoucherViewType[];
  count: number;
  error?: VoucherErrorType | null;
};

export const initialState: VoucherState = {
  vouchers: {},
  shard: 1,
  views: [],
  num_per_page: 20,
  offset: 0,
  count: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: voucherNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    getVoucher: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    createVoucher: (state, action: PayloadAction<VoucherType>) => {
      state.error = null;
    },
    updateVoucher: (state, action: PayloadAction<VoucherType>) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<VoucherViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'voucher_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    setVoucher: (state, action: PayloadAction<VoucherType>) => {
      state.vouchers = {
        ...state.vouchers,
        [action.payload.voucher_id]: action.payload,
      };
    },
    setVouchers: (state, action: PayloadAction<VoucherType[]>) => {
      state.vouchers = {
        ...state.vouchers,
        ...objectify(action.payload, 'voucher_id'),
      };
    },
    loadVouchers: state => {
      state.error = null;
    },
    listVouchersBySet: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    voucherError(state, action: PayloadAction<VoucherErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: voucherActions, reducer } = slice;

export const useVoucherSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: voucherSaga });
  return { actions: slice.actions };
};
