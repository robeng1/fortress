import { PayloadAction } from '@reduxjs/toolkit';
import { fortressApi } from 'app/api/axios';
import { Shop } from 'app/models/settings/shop-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { settingsActions as actions } from '.';
import { selectUserID } from './selectors';
import { SettingsErrorType } from './type';

export function* updateShop(action: PayloadAction<Shop>) {
  const body = action.payload;
  if (body.shop_id?.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${body.shop_id}`;
  try {
    const shop: Shop = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchUpdateShop() {
  // Watches for loadOffers actions and calls getOffers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.updateShop.type, updateShop);
}

export function* getShop(action: PayloadAction<string>) {
  const shopID = action.payload;
  if (shopID.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}`;
  try {
    const shop: Shop = yield call(request, requestURL);
    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchGetShop() {
  // Watches for loadOffers actions and calls getOffers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getShop.type, getShop);
}

export function* getShopByMerchantID() {
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.USERID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/${userID}/shops`;
  try {
    const shop: Shop = yield call(request, requestURL);

    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchGetShopByMerchantID() {
  // Watches for loadOffers actions and calls getOffers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getShopByMerchantId.type, getShopByMerchantID);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* settingsSaga() {
  yield all([
    fork(watchUpdateShop),
    fork(watchGetShop),
    fork(watchGetShopByMerchantID),
  ]);
}
