import { fortressURL } from 'app/endpoints/urls';
import { ShopOrderListType } from 'app/models/order/order-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';

import { orderActions as actions } from '.';
import { selectNextPageToken, selectShopId } from './selectors';
import { OrderErrorType } from './types';

export function* getOrders() {
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.orderError(OrderErrorType.SHOPID_EMPTY));
    return;
  }
  const page: string = yield select(selectNextPageToken);
  const requestURL = `${fortressURL}/shops/${shopId}/orders?page=${page}`;
  try {
    const orderList: ShopOrderListType = yield call(request, requestURL);
    if (orderList && orderList.orders && orderList.orders.length > 0) {
      yield put(actions.canonicalOrdersLoaded(orderList));
    } else {
      yield put(actions.orderError(OrderErrorType.SHOP_HAS_NO_ORDERS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.orderError(OrderErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.orderError(OrderErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadOrders() {
  yield takeLatest(actions.loadOrders.type, getOrders);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* orderSaga() {
  yield all([fork(watchLoadOrders)]);
}
