import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ProductListType, ProductType } from 'app/models/product/product-type';
import { productActions as actions } from '.';
import { selectShopID } from './selectors';
import { ProductErrorType } from './types';
import { fortressApi } from 'app/api/axios';
import { request, ResponseError } from 'utils/request';

export function* getProducts() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/products`;
  try {
    const productList: ProductListType = yield call(request, requestURL);
    if (productList && productList.product && productList.product.length > 0) {
      yield put(actions.productsLoaded(productList));
    } else {
      yield put(actions.productError(ProductErrorType.SHOP_HAS_NO_PRODUCTS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.productError(ProductErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.productError(ProductErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadProducts() {
  // Watches for loadProducts actions and calls getProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadProducts.type, getProducts);
}

export function* getChildren(action: PayloadAction<string>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const productId = action.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/products/${productId}/variants`;
  try {
    const variants: ProductListType = yield call(request, requestURL);
    if (variants && variants.product && variants.product.length > 0) {
      yield put(actions.variantsLoaded(variants));
    } else {
      yield put(actions.productError(ProductErrorType.SHOP_HAS_NO_PRODUCTS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.productError(ProductErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.productError(ProductErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadChildren() {
  // Watches for loadProducts actions and calls getProducts when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadVariants.type, getChildren);
}

export function* createProduct(action: PayloadAction<ProductType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/products`;
  try {
    const product: ProductType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (product) {
      yield put(actions.productsLoaded({ product: [product] }));
    }
  } catch (err) {
    yield put(actions.productError(ProductErrorType.RESPONSE_ERROR));
  }
}

export function* watchCreateProduct() {
  yield takeLatest(actions.createProduct.type, createProduct);
}
export function* updateProduct(action: PayloadAction<ProductType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/products/${body.product_id}`;
  try {
    const product: ProductType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action?.payload),
    });

    if (product) {
      yield put(actions.productsLoaded({ product: [product] }));
    }
  } catch (err) {
    yield put(actions.productError(ProductErrorType.RESPONSE_ERROR));
  }
}
export function* watchUpdateProduct() {
  yield takeLatest(actions.updateProduct.type, updateProduct);
}
export default function* productSaga() {
  yield all([
    fork(watchLoadProducts),
    fork(watchLoadChildren),
    fork(watchCreateProduct),
    fork(watchUpdateProduct),
  ]);
}
