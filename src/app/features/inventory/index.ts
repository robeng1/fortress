import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import {
  InventoryType,
  LocationType,
  InventoryListType,
  InventoryViewType,
} from 'app/models/inventory/inventory-type';
import { objectify } from 'app/utils/utils';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import inventorySaga from './saga';
import { InventoryErrorType } from './types';

const inventoryNamespace = 'inventory';

export type InventoryState = {
  // product_id, variant_id, centre_id
  stock_records: {
    [key: string]: { [key: string]: { [key: string]: InventoryType } };
  };
  locations: { [key: string]: LocationType };
  views: InventoryViewType[];
  offset: number;
  num_per_page: number;
  shard: number;
  nextPageToken: string;
  count: number;
  error?: InventoryErrorType | null;
};

export const initialState: InventoryState = {
  stock_records: {},
  locations: {},
  shard: 1,
  nextPageToken: '',
  count: 0,
  views: [],
  num_per_page: 20,
  offset: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: inventoryNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createRecord: (state, action: PayloadAction<InventoryType>) => {
      state.error = null;
    },
    updateRecord: (state, action: PayloadAction<InventoryType>) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<InventoryViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'stock_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    loadRecords: state => {
      state.error = null;
    },
    loadLoactions: state => {
      state.error = null;
    },
    locationsLoaded: (state, action: PayloadAction<LocationType[]>) => {
      const locations = action?.payload;
      if (locations) {
        state.locations = {
          ...objectify(locations, 'centre_id'),
        };
      }
    },
    createLocation: (state, action: PayloadAction<LocationType>) => {
      state.error = null;
    },
    updateLocation: (state, action: PayloadAction<LocationType>) => {
      state.error = null;
    },
    getRecord: (
      state,
      action: PayloadAction<{
        productId: string;
        variantId: string;
        centreId: string;
      }>,
    ) => {
      state.error = null;
    },
    setRecord: (state, action: PayloadAction<InventoryType>) => {
      state.stock_records = {
        ...state.stock_records,
        [action.payload.product_id]: {
          ...state.stock_records[action.payload.product_id],
          [action.payload.variant_id]: {
            ...state.stock_records[action.payload.product_id][
              action.payload.variant_id
            ],
            [action.payload.centre_id]: action.payload,
          },
        },
      };
    },
    recordsLoaded: (state, action: PayloadAction<InventoryListType>) => {
      const { stock_records, next_page_token } = action?.payload;
      if (stock_records) {
        stock_records.forEach(stock => {
          state.stock_records = {
            ...state.stock_records,
            [stock.product_id]: {
              ...state.stock_records[stock.product_id],
              [stock.variant_id]: {
                ...state.stock_records[stock.product_id][stock.variant_id],
                [stock.centre_id]: stock,
              },
            },
          };
        });
      }
      if (next_page_token) {
        state.nextPageToken = next_page_token;
      }
    },
    inventoryError(state, action: PayloadAction<InventoryErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: inventoryActions, reducer } = slice;

export const useInventorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: inventorySaga });
  return { actions: slice.actions };
};
