import { PayloadAction } from '@reduxjs/toolkit';
import { fortressApi } from 'app/api/axios';
import {
  InventoryType,
  InventoryListType,
  LocationType,
} from 'app/models/inventory/inventory-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { inventoryActions as actions } from '.';
import { selectShopID } from './selectors';
import { InventoryErrorType } from './types';

export function* getLocations() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/centres`;
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
  // Watches for loadInventorys actions and calls getInventorys when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadLoactions.type, getLocations);
}

export function* createLocation(action: PayloadAction<LocationType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/centres`;
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
  }
}

export function* watchCreateLocation() {
  // Watches for loadInventorys actions and calls getInventorys when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.createLocation.type, createLocation);
}

export function* updateLocation(action: PayloadAction<LocationType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/centres/${body.centre_id}`;
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
  }
}

export function* watchUpdateLocation() {
  // Watches for loadInventorys actions and calls getInventorys when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.updateLocation.type, updateLocation);
}

export function* getRecords() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/inventories`;
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

export function* watchLoadInventories() {
  // Watches for loadInventorys actions and calls getInventorys when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadRecords.type, getRecords);
}

export function* createInventory(action: PayloadAction<InventoryType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const d = action?.payload as InventoryType;
  const requestURL = `${fortressApi}/shops/${shopID}/products/${d.product_id}/inventories`;
  try {
    const inventory: InventoryType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (inventory) {
      yield put(
        actions.recordsLoaded({
          stock_records: [inventory],
        }),
      );
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
  }
}

export function* watchCreateInventory() {
  yield takeLatest(actions.createRecord.type, createInventory);
}

export function* updateInventory(action: PayloadAction<InventoryType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.inventoryError(InventoryErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/products/${body.product_id}/inventories/${body.variant_id}`;
  try {
    const inventory: InventoryType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (inventory) {
      yield put(
        actions.recordsLoaded({
          stock_records: [inventory],
        }),
      );
    }
  } catch (err) {
    yield put(actions.inventoryError(InventoryErrorType.RESPONSE_ERROR));
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
    fork(watchLoadInventories),
    fork(watchCreateInventory),
    fork(watchUpdateInventory),
    fork(watchCreateLocation),
    fork(watchUpdateLocation),
  ]);
}
