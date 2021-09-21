import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  CollectionListType,
  CollectionProductType,
  CollectionType,
} from 'app/models/collection/collection-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { collectionActions as actions } from '.';
import { selectCollectionsNextPageToken, selectShopId } from './selectors';
import { CollectionErrorType } from './types';

export function* getCollections() {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectCollectionsNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopID}/collections?page=${page}`;
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
  yield takeLatest(actions.loadCollections.type, getCollections);
}

export function* createCollection(action: PayloadAction<CollectionType>) {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/collections`;
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
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/collections/${body.collection_id}`;
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
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const collectionId = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/collections/${collectionId}/products`;
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
