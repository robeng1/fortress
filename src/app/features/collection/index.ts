import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import {
  CollectionListType,
  CollectionProductType,
  CollectionType,
  CollectionViewType,
} from 'app/models/collection/collection-type';
import { CollectionErrorType } from './types';
import collectionSaga from './saga';
import { objectify } from 'app/utils/utils';

const collectionNamespace = 'collection';

export type CollectionState = {
  collections: { [key: string]: CollectionType };
  products: { [key: string]: { [key: string]: CollectionProductType } };
  shard: number;
  offset: number;
  num_per_page: number;
  views: CollectionViewType[];
  collectionsNextPageToken: string;
  collectionsCount: number;
  error?: CollectionErrorType | null;
};

export const initialState: CollectionState = {
  collections: {},
  products: {},
  shard: 1,
  views: [],
  num_per_page: 20,
  offset: 0,
  collectionsNextPageToken: '',
  collectionsCount: 0,
  error: null,
};

const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: collectionNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    getCollection: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    createCollection: (state, action: PayloadAction<CollectionType>) => {
      state.error = null;
    },
    updateCollection: (state, action: PayloadAction<CollectionType>) => {
      state.error = null;
    },
    createCollectionProduct: (
      state,
      action: PayloadAction<CollectionProductType>,
    ) => {
      state.error = null;
    },
    updateCollectionProduct: (
      state,
      action: PayloadAction<CollectionProductType>,
    ) => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<CollectionViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'collection_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    setCollection: (state, action: PayloadAction<CollectionType>) => {
      state.collections = {
        ...state.collections,
        [action.payload.collection_id]: action.payload,
      };
    },
    loadCollections: state => {
      state.error = null;
    },
    loadProducts: (state, action: PayloadAction<string>) => {
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
    },
    collectionError(state, action: PayloadAction<CollectionErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: collectionActions, reducer } = slice;

export const useCollectionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: collectionSaga });
  return { actions: slice.actions };
};
