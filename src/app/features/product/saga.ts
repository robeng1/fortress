import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { ProductListType, ProductType } from 'app/models/product/product-type';
import { productActions as actions } from '.';
import { selectNextPageToken, selectShopId } from './selectors';
import { ProductErrorType } from './types';
import { fortressURL } from 'app/endpoints/urls';
import { request, ResponseError } from 'utils/request';
import { uiActions } from '../ui';

export function* getProducts() {
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopId}/products?page=${page}`;
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
  yield takeLatest(actions.loadProducts.type, getProducts);
}

export function* getChildren(action: PayloadAction<string>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const productId = action.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/products/${productId}/variants`;
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
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchLoadChildren() {
  yield takeLatest(actions.loadVariants.type, getChildren);
}

export function* createProduct(action: PayloadAction<ProductType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/products`;
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
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateProduct() {
  yield takeLatest(actions.createProduct.type, createProduct);
}
export function* updateProduct(action: PayloadAction<ProductType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.productError(ProductErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/products/${body.product_id}`;
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
  } finally {
    yield put(uiActions.stopAction(action));
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
