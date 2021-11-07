import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  CollectionListType,
  CollectionProductType,
  CollectionType,
  CollectionViewType,
} from 'app/models/collection/collection-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { collectionActions as actions } from '.';
import { uiActions } from '../ui';
import {
  selectCollectionsNextPageToken,
  selectCount,
  selectOffset,
  selectShopId,
} from './selectors';
import { CollectionErrorType } from './types';

export function* getCollections() {
  yield put(uiActions.startAction(actions.loadCollections()));
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
  } finally {
    yield put(uiActions.stopAction(actions.loadCollections()));
  }
}

export function* watchLoadCollections() {
  yield takeLatest(actions.loadCollections.type, getCollections);
}

export function* getCollection(action: PayloadAction<string>) {
  const collectionId = action.payload;
  yield put(uiActions.startAction(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/collections/${collectionId}`;
  try {
    const collection: CollectionType = yield call(request, requestURL);
    if (collection) {
      yield put(actions.setCollection(collection));
    } else {
      // this will be quite weird
      yield put(actions.collectionError(CollectionErrorType.SHOP_NOT_FOUND));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.collectionError(CollectionErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetCollection() {
  yield takeLatest(actions.getCollection.type, getCollection);
}

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/collectionsq`;
  // TODO: query fetches only the most recent 20 collections but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM collections WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: CollectionViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
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
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
}

export function* createCollection(action: PayloadAction<CollectionType>) {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.collectionError(CollectionErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/collections`;
  yield put(uiActions.startAction(action));
  try {
    const collection: CollectionType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (collection) {
      yield put(actions.setCollection(collection));
    }
  } catch (err) {
    yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
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
  yield put(uiActions.startAction(action));
  try {
    const collection: CollectionType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (collection) {
      yield put(actions.setCollection(collection));
    }
  } catch (err) {
    yield put(actions.collectionError(CollectionErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
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
  yield put(uiActions.startAction(action));
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
  } finally {
    yield put(uiActions.stopAction(action));
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
    fork(watchLoadViews),
    fork(watchCreateCollection),
    fork(watchUpdateCollection),
    fork(watchGetCollection),
    fork(watchloadCollectionProducts),
  ]);
}
