import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  DiscountType,
  DiscountListType,
  DiscountViewType,
} from 'app/models/discount/discount-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { discountActions as actions } from '.';
import { uiActions } from '../ui';
import {
  selectCount,
  selectNextPageToken,
  selectOffset,
  selectShopId,
} from './selectors';
import { DiscountErrorType } from './types';

export function* getDiscounts() {
  yield put(uiActions.startAction(actions.loadDiscounts()));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopID}/offers?page=${page}`;
  try {
    const offerList: DiscountListType = yield call(request, requestURL);
    if (offerList && offerList.discounts && offerList.discounts.length > 0) {
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
  } finally {
    yield put(uiActions.startAction(actions.loadDiscounts()));
  }
}

export function* watchLoadDiscounts() {
  yield takeLatest(actions.loadDiscounts.type, getDiscounts);
}

export function* getDiscount(action: PayloadAction<string>) {
  const discountId = action.payload;
  yield put(uiActions.startAction(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/discounts/${discountId}`;
  try {
    const discount: DiscountType = yield call(request, requestURL);
    if (discount) {
      yield put(actions.setDiscount(discount));
    } else {
      // this will be quite weird
      yield put(actions.discountError(DiscountErrorType.SHOP_NOT_FOUND));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.discountError(DiscountErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.discountError(DiscountErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetDiscount() {
  yield takeLatest(actions.getDiscount.type, getDiscount);
}

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.discountError(DiscountErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/discountsq`;
  // TODO: query fetches only the most recent 20 discounts but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM discounts WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: DiscountViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
    } else {
      yield put(actions.discountError(DiscountErrorType.SHOP_HAS_NO_OFFERS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.discountError(DiscountErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.discountError(DiscountErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
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
      yield put(actions.setDiscount(offer));
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
  const requestURL = `${fortressURL}/shops/${shopID}/offers/${body.discount_id}`;
  try {
    const offer: DiscountType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (offer) {
      yield put(actions.setDiscount(offer));
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
    fork(watchLoadViews),
    fork(watchGetDiscount),
  ]);
}
