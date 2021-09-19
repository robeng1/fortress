import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  InventoryType,
  LocationType,
  InventoryListType,
} from 'app/models/inventory/inventory-type';
import { objectify } from 'app/utils/utils';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import inventorySaga from './saga';
import { InventoryErrorType } from './types';

const inventoryNamespace = 'inventory';

export type InventoryState = {
  stock_records: InventoryType[];
  locations: { [key: string]: LocationType };
  shard: number;
  nextPageToken: string;
  count: number;
  loading: boolean;
  error?: InventoryErrorType | null;
};

export const initialState: InventoryState = {
  stock_records: [],
  locations: {},
  shard: 1,
  nextPageToken: '',
  count: 0,
  loading: false,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: inventoryNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createRecord: (state, action: PayloadAction<InventoryType>) => {
      state.loading = true;
      state.error = null;
    },
    updateRecord: (state, action: PayloadAction<InventoryType>) => {
      state.loading = true;
      state.error = null;
    },
    loadRecords: state => {
      state.loading = true;
      state.error = null;
    },
    loadLoactions: state => {
      state.loading = true;
      state.error = null;
    },
    locationsLoaded: (state, action: PayloadAction<LocationType[]>) => {
      const locations = action?.payload;
      if (locations && locations.length > 0) {
        state.locations = {
          ...state.locations,
          [locations[0].centre_id!]: {
            ...objectify(locations, 'centre_id'),
          },
        };
      }
      state.loading = false;
    },
    createLocation: (state, action: PayloadAction<LocationType>) => {
      state.loading = true;
      state.error = null;
    },
    updateLocation: (state, action: PayloadAction<LocationType>) => {
      state.loading = true;
      state.error = null;
    },
    getRecord: state => {
      state.loading = true;
      state.error = null;
    },
    recordsLoaded: (state, action: PayloadAction<InventoryListType>) => {
      const { stock_records, next_page_token } = action?.payload;
      if (stock_records) {
        state.stock_records = [...stock_records, ...state.stock_records];
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    inventoryError(state, action: PayloadAction<InventoryErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: inventoryActions, reducer } = slice;

export const useInventorySlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: inventorySaga });
  return { actions: slice.actions };
};
