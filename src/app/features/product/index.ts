import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  ProductImage,
  ProductListType,
  ProductType,
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
    [key: string]: { [key: string]: ProductType | ProductType[] };
  };
  nextPageToken: string;
  count: number;
  loading: boolean;
  error?: ProductErrorType | null;
};

export const initialState: ProductState = {
  products: {},
  product_variants: {},
  nextPageToken: '',
  count: 0,
  loading: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: productNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createProduct: (state, action: PayloadAction<ProductType>) => {
      state.loading = true;
      state.error = null;
    },
    updateProduct: (state, action: PayloadAction<ProductType>) => {
      state.loading = true;
      state.error = null;
    },
    loadProducts: state => {
      state.loading = true;
      state.error = null;
    },
    loadVariants: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    getProduct: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    setProductImage: (state, action: PayloadAction<ProductImage>) => {
      state.loading = true;
      state.error = null;
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

      state.loading = false;
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
      state.loading = false;
    },
    productError(state, action: PayloadAction<ProductErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { actions: productActions, reducer } = slice;

export const useProductSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: productSaga });
  return { actions: slice.actions };
};
