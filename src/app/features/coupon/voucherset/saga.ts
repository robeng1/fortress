import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  VoucherSetType,
  VoucherSetViewType,
} from 'app/models/voucher/voucherset';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { voucherSetActions as actions } from '.';
import { uiActions } from 'app/features/ui';
import { selectCount, selectOffset, selectShopId } from './selectors';
import { VoucherSetErrorType } from './types';

// export function* getVoucherSet(action: PayloadAction<string>) {
//   const discountId = action.payload;
//   yield put(uiActions.startAction(action));
//   const shopId: string = yield select(selectShopId);
//   if (shopId.length === 0) {
//     yield put(actions.voucherSetError(VoucherSetErrorType.SHOPID_EMPTY));
//     return;
//   }
//   const requestURL = `${fortressURL}/shops/${shopId}/discounts/${discountId}`;
//   try {
//     const set: VoucherSetType = yield call(request, requestURL);
//     if (set) {
//       yield put(actions.setVoucherSet(set));
//     } else {
//       // this will be quite weird
//       yield put(actions.voucherSetError(VoucherSetErrorType.SHOP_NOT_FOUND));
//     }
//   } catch (err) {
//     if ((err as ResponseError).response?.status === 404) {
//       yield put(actions.voucherSetError(VoucherSetErrorType.SHOP_NOT_FOUND));
//     } else {
//       yield put(actions.voucherSetError(VoucherSetErrorType.RESPONSE_ERROR));
//     }
//   } finally {
//     yield put(uiActions.stopAction(action));
//   }
// }

// export function* watchGetVoucherSet() {
//   yield takeLatest(actions.getVoucherSet.type, getVoucherSet);
// }

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.voucherSetError(VoucherSetErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/voucher-setsq`;
  // TODO: query fetches only the most recent 20 voucher sets but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM voucher-sets WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: VoucherSetViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
    } else {
      yield put(
        actions.voucherSetError(VoucherSetErrorType.SHOP_HAS_NO_VOUCHERS),
      );
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.voucherSetError(VoucherSetErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.voucherSetError(VoucherSetErrorType.RESPONSE_ERROR));
    }
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
}

export function* createVoucherSet(action: PayloadAction<VoucherSetType>) {
  yield put(uiActions.startAction(action));
  const shopID: string = yield select(selectShopId);
  if (shopID.length === 0) {
    yield put(actions.voucherSetError(VoucherSetErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopID}/voucher-sets`;
  try {
    const voucherSet: VoucherSetType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (voucherSet) {
      yield put(actions.setVoucherSet(voucherSet));
    }
  } catch (err) {
    yield put(actions.voucherSetError(VoucherSetErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateVoucherSet() {
  yield takeLatest(actions.createVoucherSet.type, createVoucherSet);
}

// export function* updateVoucherSet(action: PayloadAction<VoucherSetType>) {
//   yield put(uiActions.startAction(action));
//   const shopID: string = yield select(selectShopId);
//   if (shopID.length === 0) {
//     yield put(actions.voucherSetError(VoucherSetErrorType.SHOPID_EMPTY));
//     return;
//   }
//   const body = action?.payload;
//   const requestURL = `${fortressURL}/shops/${shopID}/offers/${body.voucher_set_id}`;
//   try {
//     const offer: VoucherSetType = yield call(request, requestURL, {
//       method: 'PATCH',
//       body: JSON.stringify(body),
//     });

//     if (offer) {
//       yield put(actions.setVoucherSet(offer));
//     }
//   } catch (err) {
//     yield put(actions.voucherSetError(VoucherSetErrorType.RESPONSE_ERROR));
//   } finally {
//     yield put(uiActions.stopAction(action));
//   }
// }

// export function* watchUpdateVoucherSet() {
//   yield takeLatest(actions.updateVoucherSet.type, updateVoucherSet);
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* voucherSetSaga() {
  yield all([
    fork(watchCreateVoucherSet),
    // fork(watchUpdateVoucherSet),
    fork(watchLoadViews),
    // fork(watchGetVoucherSet),
  ]);
}
