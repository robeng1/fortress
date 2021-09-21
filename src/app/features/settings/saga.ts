import { PayloadAction } from '@reduxjs/toolkit';
import { domainURL, fortressURL } from 'app/endpoints/urls';
import { ShopType } from 'app/models/settings/shop-type';
import {
  all,
  call,
  fork,
  put,
  select,
  takeLatest,
  throttle,
} from 'redux-saga/effects';
import { request } from 'utils/request';
import { settingsActions as actions } from '.';
import { selectUserId } from './selectors';
import { SettingsErrorType } from './type';

export function* ask(action: PayloadAction<string>) {
  const requestURL = `${domainURL}/ask?domain=${action.payload}`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = yield call(request, requestURL);
    yield put(actions.settingsError(SettingsErrorType.SHOP_NAME_ALREADY_TAKEN));
  } catch (err) {
    yield put(actions.clearError());
  }
}

export function* watchAsk() {
  yield throttle(500, actions.ask.type, ask);
}

export function* createShop(action: PayloadAction<ShopType>) {
  const body = action.payload;
  const requestURL = `${fortressURL}/shops/`;
  try {
    const shop: ShopType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchCreateShop() {
  yield takeLatest(actions.createShop.type, createShop);
}

export function* updateShop(action: PayloadAction<ShopType>) {
  const body = action.payload;
  if (body.shop_id?.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${body.shop_id}`;
  try {
    const shop: ShopType = yield call(request, requestURL, {
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
  yield takeLatest(actions.updateShop.type, updateShop);
}

export function* getShop(action: PayloadAction<string>) {
  const shopId = action.payload;
  if (shopId.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}`;
  try {
    const shop: ShopType = yield call(request, requestURL);
    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchGetShop() {
  yield takeLatest(actions.getShop.type, getShop);
}

export function* getShopByMerchantId() {
  const userID: string = yield select(selectUserId);
  if (userID.length === 0) {
    yield put(actions.settingsError(SettingsErrorType.USERID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/${userID}/shops`;
  try {
    const shop: ShopType = yield call(request, requestURL);

    if (shop) {
      yield put(actions.setShop(shop));
    }
  } catch (err) {
    yield put(actions.settingsError(SettingsErrorType.RESPONSE_ERROR));
  }
}

export function* watchGetShopByMerchantId() {
  yield takeLatest(actions.getShopByMerchantId.type, getShopByMerchantId);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* settingsSaga() {
  yield all([
    fork(watchUpdateShop),
    fork(watchCreateShop),
    fork(watchGetShop),
    fork(watchGetShopByMerchantId),
    fork(watchAsk),
  ]);
}
