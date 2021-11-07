import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import uniqBy from 'lodash/uniqBy';

import {
  ProductImage,
  ProductListType,
  ProductType,
  ProductViewType,
} from 'app/models/product/product-type';
import { objectify } from 'app/utils/utils';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import productSaga from './saga';
import { ProductErrorType } from './types';

const productNamespace = 'product';

export type ProductState = {
  products: { [key: string]: ProductType };
  // this is keyed by the product ID and they keyed again by the variant id
  product_variants: {
    [key: string]: { [key: string]: ProductType[] };
  };
  views: ProductViewType[];
  offset: number;
  num_per_page: number;
  nextPageToken: string;
  count: number;
  error?: ProductErrorType | null;
};

export const initialState: ProductState = {
  products: {},
  product_variants: {},
  nextPageToken: '',
  views: [],
  num_per_page: 20,
  offset: 0,
  count: 0,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: productNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createProduct: (state, action: PayloadAction<ProductType>) => {
      state.error = null;
    },
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      state.error = null;
    },
    loadProducts: state => {
      state.error = null;
    },
    loadViews: state => {
      state.error = null;
    },
    viewsLoaded: (state, action: PayloadAction<ProductViewType[]>) => {
      const views = action.payload;
      if (views.length > 0) {
        state.views = uniqBy([...views, ...state.views], 'product_id');
      }
      // this will serve as the offset when fetching
      state.offset = views.length;
      state.error = null;
    },
    loadVariants: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    getProduct: (state, action: PayloadAction<string>) => {
      state.error = null;
    },
    setProductImage: (state, action: PayloadAction<ProductImage>) => {
      state.error = null;
    },
    setProduct: (state, action: PayloadAction<ProductType>) => {
      state.products = {
        ...state.products,
        [action.payload.product_id]: action.payload,
      };
    },
    productsLoaded: (state, action: PayloadAction<ProductListType>) => {
      const { product, next_page_token } = action?.payload;
      if (product && product.length > 0) {
        state.products = {
          ...state.products,
          ...objectify(product, 'handle'),
        };
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      if (next_page_token) {
        state.nextPageToken = next_page_token;
      }
    },
    variantsLoaded: (state, action: PayloadAction<ProductListType>) => {
      const { product, next_page_token } = action?.payload;
      if (product && product.length > 0) {
        state.product_variants = {
          ...state.product_variants,
          [product[0].handle!]: { ...objectify(product, 'variant_id') },
        };
        if (next_page_token) {
          state.nextPageToken = next_page_token;
        }
      }
      if (next_page_token) {
        state.nextPageToken = next_page_token;
      }
    },
    productError(state, action: PayloadAction<ProductErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: productActions, reducer } = slice;

export const useProductSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productSaga });
  return { actions: slice.actions };
};
