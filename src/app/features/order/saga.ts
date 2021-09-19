import { ShopOrderListType } from 'app/models/order/order-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';

import { orderActions as actions } from '.';
import { selectShopID } from './selectors';
import { OrderErrorType } from './types';

export function* getOrders() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.orderError(OrderErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `https://api.reoplex.com/admin/shops/${shopID}/orders`;
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
  // Watches for loadInventorys actions and calls getInventorys when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadOrders.type, getOrders);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* orderSaga() {
  yield all([fork(watchLoadOrders)]);
}
