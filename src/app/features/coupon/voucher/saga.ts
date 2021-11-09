import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import { VoucherType, VoucherViewType } from 'app/models/voucher/voucher';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { voucherActions as actions } from '.';
import { uiActions } from 'app/features/ui';
import { selectCount, selectOffset, selectShopId } from './selectors';
import { VoucherErrorType } from './types';

export function* getVoucher(action: PayloadAction<string>) {
  const voucherId = action.payload;
  yield put(uiActions.startAction(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.voucherError(VoucherErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/vouchers/${voucherId}`;
  try {
    const voucher: VoucherType = yield call(request, requestURL);
    if (voucher) {
      yield put(actions.setVoucher(voucher));
    } else {
      // this will be quite weird
      yield put(actions.voucherError(VoucherErrorType.SHOP_NOT_FOUND));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.voucherError(VoucherErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.voucherError(VoucherErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetVoucher() {
  yield takeLatest(actions.getVoucher.type, getVoucher);
}

export function* listVouchersBySet(action: PayloadAction<string>) {
  const voucherSetId = action.payload;
  yield put(uiActions.startAction(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.voucherError(VoucherErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/voucher-sets/${voucherSetId}/vouchers`;
  try {
    const vouchers: VoucherType[] = yield call(request, requestURL);
    if (vouchers) {
      yield put(actions.setVouchers(vouchers));
    } else {
      // this will be quite weird
      yield put(actions.voucherError(VoucherErrorType.SHOP_NOT_FOUND));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.voucherError(VoucherErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.voucherError(VoucherErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchListVouchersBySet() {
  yield takeLatest(actions.listVouchersBySet.type, listVouchersBySet);
}

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.voucherError(VoucherErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/vouchersq`;
  // TODO: query fetches only the most recent 20 voucher sets but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM vouchers WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: VoucherViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
    } else {
      yield put(actions.voucherError(VoucherErrorType.SHOP_HAS_NO_VOUCHERS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.voucherError(VoucherErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.voucherError(VoucherErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
}

export function* createVoucher(action: PayloadAction<VoucherType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.voucherError(VoucherErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/vouchers`;
  try {
    const voucher: VoucherType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (voucher) {
      yield put(actions.setVoucher(voucher));
    }
  } catch (err) {
    yield put(actions.voucherError(VoucherErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateVoucher() {
  yield takeLatest(actions.createVoucher.type, createVoucher);
}

export function* updateVoucher(action: PayloadAction<VoucherType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.voucherError(VoucherErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressURL}/shops/${shopID}/vouchers/${body.voucher_id}`;
  try {
    const voucher: VoucherType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (voucher) {
      yield put(actions.setVoucher(voucher));
    }
  } catch (err) {
    yield put(actions.voucherError(VoucherErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateVoucher() {
  yield takeLatest(actions.updateVoucher.type, updateVoucher);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* voucherSaga() {
  yield all([
    fork(watchCreateVoucher),
    fork(watchUpdateVoucher),
    fork(watchLoadViews),
    fork(watchGetVoucher),
    fork(watchListVouchersBySet),
  ]);
}
