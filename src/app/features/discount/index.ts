import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import {
  DiscountType,
  DiscountListType,
  DiscountViewType,
} from 'app/models/discount/discount-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import DiscountSaga from './saga';
import { DiscountErrorType } from './types';
import { objectify } from 'app/utils/utils';

const discountNamespace = 'discount';

export type DiscountState = {
  discounts: { [key: string]: DiscountType };
  shard: number;
  views: DiscountViewType[];
  offset: number;
  num_per_page: number;
  nextPageToken: string;
  count: number;
  error?: DiscountErrorType | null;
};

export const initialState: DiscountState = {
  discounts: {},
  shard: 0,
  nextPageToken: '',
  views: [],
  num_per_page: 20,
  offset: 0,
  count: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: discountNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    getDiscount: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    createDiscount: (state, action: PayloadAction<DiscountType>) => {
      state.error = null;
    },
    updateDiscount: (state, action: PayloadAction<DiscountType>) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<DiscountViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'discount_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    loadDiscounts: state => {
      state.error = null;
    },
    setDiscount: (state, action: PayloadAction<DiscountType>) => {
      state.discounts = {
        ...state.discounts,
        [action.payload.discount_id]: action.payload,
      };
    },
    discountsLoaded: (state, action: PayloadAction<DiscountListType>) => {
      const { discounts, next_page_token } = action?.payload;
      if (discounts) {
        state.discounts = {
          ...state.discounts,
          ...objectify(discounts, 'discount_id'),
        };
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
    },
    discountError(state, action: PayloadAction<DiscountErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: discountActions, reducer } = slice;

export const useDiscountSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: DiscountSaga });
  return { actions: slice.actions };
};
