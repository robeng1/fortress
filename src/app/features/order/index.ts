import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';

import {
  OrderListType,
  OrderType,
  OrderViewType,
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
  orders: { [key: string]: OrderType };
  views: OrderViewType[];
  nextPageToken: string;
  offset: number;
  num_per_page: number;
  error?: OrderErrorType | null;
};

export const initialState: OrderState = {
  canonical_orders: {},
  orders: {},
  views: [],
  shard: 0,
  nextPageToken: '',
  num_per_page: 20,
  offset: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: orderNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    updateOrder: (state, action: PayloadAction<OrderType>) => {
      state.error = null;
    },
    loadOrders: state => {
      state.error = null;
    },
    getOrder: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    updateOrderStatus: (
      state,
      action: PayloadAction<{ orderId: string; status: number }>,
    ) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<OrderViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'order_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
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
    },
    setOrder: (state, action: PayloadAction<OrderType>) => {
      state.orders = {
        ...state.orders,
        order_id: action.payload,
      };
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
    },
    orderError(state, action: PayloadAction<OrderErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: orderActions, reducer } = slice;

export const useOrderSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: orderSaga });
  return { actions: slice.actions };
};
