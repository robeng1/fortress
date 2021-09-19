import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  OrderListType,
  OrderType,
  ShopOrderListType,
  ShopOrderType,
} from 'app/models/order/order-type';
import { objectify } from 'app/utils/utils';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import orderSaga from './saga';
import { OrderErrorType } from './types';

const orderNamespace = 'order';

export type OrderState = {
  canonical_orders: { [key: string]: ShopOrderType };
  shard: number;
  orders: OrderType[];
  nextPageToken: string;
  count: number;
  loading: boolean;
  error?: OrderErrorType | null;
};

export const initialState: OrderState = {
  canonical_orders: {},
  orders: [],
  shard: 0,
  nextPageToken: '',
  count: 0,
  loading: false,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: orderNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    updateOrder: (state, action: PayloadAction<OrderType>) => {
      state.loading = true;
      state.error = null;
    },
    loadOrders: state => {
      state.loading = true;
      state.error = null;
    },
    getOrder: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: string }>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    canonicalOrdersLoaded: (
      state,
      action: PayloadAction<ShopOrderListType>,
    ) => {
      const { orders, next_page_token } = action?.payload;
      if (orders) {
        state.canonical_orders = {
          ...state.canonical_orders,
          ...objectify(...orders, 'order_id'),
        };
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    ordersLoaded: (state, action: PayloadAction<OrderListType>) => {
      const { orders, next_page_token } = action?.payload;
      if (orders) {
        state.orders = {
          ...state.orders,
          ...objectify(...orders, 'order_id'),
        };
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    orderError(state, action: PayloadAction<OrderErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: orderActions, reducer } = slice;

export const useOrderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: orderSaga });
  return { actions: slice.actions };
};
