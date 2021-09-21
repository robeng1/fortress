import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  CollectionListType,
  CollectionProductType,
  CollectionType,
} from 'app/models/collection/collection-type';
import { CollectionErrorType } from './types';
import collectionSaga from './saga';
import { objectify } from 'app/utils/utils';

const collectionNamespace = 'collection';

export type CollectionState = {
  collections: { [key: string]: CollectionType };
  products: { [key: string]: { [key: string]: CollectionProductType } };
  shard: number;
  collectionsNextPageToken: string;
  collectionsCount: number;
  loading: boolean;
  error?: CollectionErrorType | null;
};

export const initialState: CollectionState = {
  collections: {},
  products: {},
  shard: 1,
  collectionsNextPageToken: '',
  collectionsCount: 0,
  loading: false,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: collectionNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createCollection: (state, action: PayloadAction<CollectionType>) => {
      state.loading = true;
      state.error = null;
    },
    updateCollection: (state, action: PayloadAction<CollectionType>) => {
      state.loading = true;
      state.error = null;
    },
    createCollectionProduct: (
      state,
      action: PayloadAction<CollectionProductType>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    updateCollectionProduct: (
      state,
      action: PayloadAction<CollectionProductType>,
    ) => {
      state.loading = true;
      state.error = null;
    },
    loadCollections: state => {
      state.loading = true;
      state.error = null;
    },
    loadProducts: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    productsLoaded: (state, action: PayloadAction<CollectionProductType[]>) => {
      const products = action?.payload;
      if (products) {
        state.products = {
          ...state.products,
          [products[0].collection_id!]: {
            ...objectify(products, 'product_id'),
          },
        };
      }
      state.loading = false;
    },
    collectionsLoaded: (state, action: PayloadAction<CollectionListType>) => {
      const { collections, next_page_token } = action?.payload;
      if (collections) {
        state.collections = {
          ...state.collections,
          ...objectify(collections, 'collection_id'),
        };
        if (next_page_token) {
          state.collectionsNextPageToken = next_page_token;
        }
      }
      state.loading = false;
    },
    collectionError(state, action: PayloadAction<CollectionErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { actions: collectionActions, reducer } = slice;

export const useCollectionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: collectionSaga });
  return { actions: slice.actions };
};
