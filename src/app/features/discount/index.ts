import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ConditionalOfferType,
  OfferListType,
} from 'app/models/discount/discount-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import offerSaga from './saga';
import { OfferErrorType } from './types';

const discountNamespace = 'discount';

export type DiscountState = {
  offers: ConditionalOfferType[];
  shard: number;
  nextPageToken: string;
  count: number;
  loading: boolean;
  error?: OfferErrorType | null;
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
    createOffer: (state, action: PayloadAction<ConditionalOfferType>) => {
      state.loading = true;
      state.error = null;
    },
    updateOffer: (state, action: PayloadAction<ConditionalOfferType>) => {
      state.loading = true;
      state.error = null;
    },
    loadOffers: state => {
      state.loading = true;
      state.error = null;
    },
    offersLoaded: (state, action: PayloadAction<OfferListType>) => {
      const { offers, next_page_token } = action?.payload;
      if (offers) {
        state.offers = [...offers, ...state.offers];
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    discountError(state, action: PayloadAction<OfferErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: discountActions, reducer } = slice;

export const useOfferSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: offerSaga });
  return { actions: slice.actions };
};
