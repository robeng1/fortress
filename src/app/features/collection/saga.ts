import { PayloadAction } from '@reduxjs/toolkit';
import { fortressApi } from 'app/api/axios';
import {
  CollectionListType,
  CollectionProductType,
  CollectionType,
} from 'app/models/collection/collection-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { collectionActions as actions } from '.';
import { selectShopID } from './selectors';
import { CollectionErrorType } from './types';

export function* getCollections() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/collections`;
  try {
    const collectionList: CollectionListType = yield call(request, requestURL);
    if (
      collectionList &&
      collectionList.collections &&
      collectionList.collections.length > 0
    ) {
      yield put(actions.collectionsLoaded(collectionList));
    } else {
      yield put(
        actions.collectionError(CollectionErrorType.SHOP_HAS_NO_COLLECTION),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.collectionError(CollectionErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadCollections() {
  // Watches for loadCollections actions and calls getCollections when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadCollections.type, getCollections);
}

export function* createCollection(action: PayloadAction<CollectionType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/collections`;
  try {
    const collection: CollectionType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (collection) {
      yield put(
        actions.collectionsLoaded({
          collections: [collection],
        }),
      );
    }
  } catch (err) {
    yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
  }
}

export function* watchCreateCollection() {
  yield takeLatest(actions.createCollection.type, createCollection);
}

export function* updateCollection(action: PayloadAction<CollectionType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/collections/${body.collection_id}`;
  try {
    const collection: CollectionType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (collection) {
      yield put(
        actions.collectionsLoaded({
          collections: [collection],
        }),
      );
    }
  } catch (err) {
    yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
  }
}

export function* watchUpdateCollection() {
  yield takeLatest(actions.updateCollection.type, updateCollection);
}

export function* getCollectionProducts(action: PayloadAction<string>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const collectionId = action?.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/collections/${collectionId}/products`;
  try {
    const products: CollectionProductType[] = yield call(request, requestURL);
    if (products && products.length > 0) {
      yield put(actions.productsLoaded(products));
    } else {
      yield put(
        actions.collectionError(CollectionErrorType.COLLECTION_HAS_NO_PRODUCTS),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.collectionError(CollectionErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchloadCollectionProducts() {
  yield takeLatest(actions.loadProducts.type, getCollectionProducts);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* collectionSaga() {
  yield all([
    fork(watchLoadCollections),
    fork(watchCreateCollection),
    fork(watchUpdateCollection),
    fork(watchloadCollectionProducts),
  ]);
}
