import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  InventoryType,
  InventoryListType,
  LocationType,
  InventoryViewType,
} from 'app/models/inventory/inventory-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { inventoryActions as actions } from '.';
import { uiActions } from '../ui';
import {
  selectCount,
  selectNextPageToken,
  selectOffset,
  selectShopId,
} from './selectors';
import { InventoryErrorType } from './types';

export function* getLocations() {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/centres`;
  try {
    const locations: LocationType[] = yield call(request, requestURL);
    if (locations && locations.length > 0) {
      yield put(actions.locationsLoaded(locations));
    } else {
      yield put(
        actions.inventoryError(InventoryErrorType.SHOP_HAS_NO_LOCATIONS),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.inventoryError(InventoryErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadLocations() {
  yield takeLatest(actions.loadLoactions.type, getLocations);
}

export function* createLocation(action: PayloadAction<LocationType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/centres`;
  try {
    const location: LocationType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (location) {
      yield put(actions.locationsLoaded([location]));
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateLocation() {
  yield takeLatest(actions.createLocation.type, createLocation);
}

export function* updateLocation(action: PayloadAction<LocationType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/centres/${body.centre_id}`;
  try {
    const location: LocationType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (location) {
      yield put(actions.locationsLoaded([location]));
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateLocation() {
  yield takeLatest(actions.updateLocation.type, updateLocation);
}

export function* getRecords() {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopID}/inventories?page=${page}`;
  try {
    const inventoryList: InventoryListType = yield call(request, requestURL);
    if (
      inventoryList &&
      inventoryList.stock_records &&
      inventoryList.stock_records.length > 0
    ) {
      yield put(actions.recordsLoaded(inventoryList));
    } else {
      yield put(
        actions.inventoryError(InventoryErrorType.SHOP_HAS_NO_INVENTORY),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.inventoryError(InventoryErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadInventory() {
  yield takeLatest(actions.loadRecords.type, getRecords);
}

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/inventoryq`;
  // TODO: query fetches only the most recent 20 inventory but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM inventory WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: InventoryViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
    } else {
      yield put(
        actions.inventoryError(InventoryErrorType.SHOP_HAS_NO_INVENTORY),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.inventoryError(InventoryErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
}

export function* getRecord(
  action: PayloadAction<{
    productId: string;
    variantId: string;
    centreId: string;
  }>,
) {
  const { productId, variantId, centreId } = action.payload;
  yield put(uiActions.startAction(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/products/${productId}/inventories/${variantId}/records/${centreId}`;
  try {
    const inventory: InventoryType = yield call(request, requestURL);
    if (inventory) {
      yield put(actions.setRecord(inventory));
    } else {
      // this will be quite weird
      yield put(actions.inventoryError(InventoryErrorType.SHOP_NOT_FOUND));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.inventoryError(InventoryErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetRecord() {
  yield takeLatest(actions.getRecord.type, getRecord);
}

export function* createInventory(action: PayloadAction<InventoryType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const d = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/products/${d.product_id}/inventories`;
  try {
    const inventory: InventoryType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (inventory) {
      yield put(actions.setRecord(inventory));
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateInventory() {
  yield takeLatest(actions.createRecord.type, createInventory);
}

export function* updateInventory(action: PayloadAction<InventoryType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/products/${body.product_id}/inventories/${body.variant_id}/records/${body.centre_id}`;
  try {
    const inventory: InventoryType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (inventory) {
      yield put(actions.setRecord(inventory));
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateInventory() {
  yield takeLatest(actions.updateRecord.type, updateInventory);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* inventorySaga() {
  yield all([
    fork(watchLoadLocations),
    fork(watchLoadInventory),
    fork(watchCreateInventory),
    fork(watchUpdateInventory),
    fork(watchCreateLocation),
    fork(watchUpdateLocation),
    fork(watchLoadViews),
    fork(watchGetRecord),
  ]);
}
