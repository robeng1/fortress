import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  DiscountType,
  DiscountListType,
} from 'app/models/discount/discount-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import DiscountSaga from './saga';
import { DiscountErrorType } from './types';

const discountNamespace = 'discount';

export type DiscountState = {
  offers: DiscountType[];
  shard: number;
  nextPageToken: string;
  count: number;
  loading: boolean;
  error?: DiscountErrorType | null;
};

export const initialState: DiscountState = {
  offers: [],
  shard: 0,
  nextPageToken: '',
  count: 0,
  loading: false,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: discountNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createDiscount: (state, action: PayloadAction<DiscountType>) => {
      state.loading = true;
      state.error = null;
    },
    updateDiscount: (state, action: PayloadAction<DiscountType>) => {
      state.loading = true;
      state.error = null;
    },
    loadDiscounts: state => {
      state.loading = true;
      state.error = null;
    },
    discountsLoaded: (state, action: PayloadAction<DiscountListType>) => {
      const { offers, next_page_token } = action?.payload;
      if (offers) {
        state.offers = [...offers, ...state.offers];
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    discountError(state, action: PayloadAction<DiscountErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { actions: discountActions, reducer } = slice;

export const useDiscountSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DiscountSaga });
  return { actions: slice.actions };
};
