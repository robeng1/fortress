import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  DiscountType,
  DiscountListType,
} from 'app/models/discount/discount-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { discountActions as actions } from '.';
import { uiActions } from '../ui';
import { selectNextPageToken, selectShopId } from './selectors';
import { DiscountErrorType } from './types';

export function* getDiscounts() {
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopID}/offers?page=${page}`;
  try {
    const offerList: DiscountListType = yield call(request, requestURL);
    if (offerList && offerList.offers && offerList.offers.length > 0) {
      yield put(actions.discountsLoaded(offerList));
    } else {
      yield put(actions.discountError(DiscountErrorType.SHOP_HAS_NO_OFFERS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.discountError(DiscountErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.discountError(DiscountErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadDiscounts() {
  yield takeLatest(actions.loadDiscounts.type, getDiscounts);
}

export function* createDiscount(action: PayloadAction<DiscountType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/offers`;
  try {
    const offer: DiscountType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (offer) {
      yield put(
        actions.discountsLoaded({
          offers: [offer],
        }),
      );
    }
  } catch (err) {
    yield put(actions.discountError(DiscountErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateDiscount() {
  yield takeLatest(actions.createDiscount.type, createDiscount);
}

export function* updateDiscount(action: PayloadAction<DiscountType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/offers/${body.offer_id}`;
  try {
    const offer: DiscountType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (offer) {
      yield put(
        actions.discountsLoaded({
          offers: [offer],
        }),
      );
    }
  } catch (err) {
    yield put(actions.discountError(DiscountErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateDiscount() {
  yield takeLatest(actions.updateDiscount.type, updateDiscount);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* DiscountSaga() {
  yield all([
    fork(watchLoadDiscounts),
    fork(watchCreateDiscount),
    fork(watchUpdateDiscount),
  ]);
}
