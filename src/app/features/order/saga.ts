import { PayloadAction } from '@reduxjs/toolkit';
import { fortressURL } from 'app/endpoints/urls';
import {
  OrderType,
  OrderViewType,
  ShopOrderListType,
} from 'app/models/order/order-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';

import { orderActions as actions } from '.';
import { uiActions } from '../ui';
import {
  selectOffset,
  selectNextPageToken,
  selectShopId,
  selectCount,
} from './selectors';
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

export function* getViews() {
  yield put(uiActions.startAction(actions.loadViews()));
  yield put(uiActions.clearError(actions.loadViews()));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.orderError(OrderErrorType.SHOPID_EMPTY));
    return;
  }
  const offset: number = yield select(selectOffset);
  const countPerPage = yield select(selectCount);
  const requestURL = `${fortressURL}/shops/${shopId}/ordersq`;
  // TODO: query fetches only the most recent 20 orders but will be changed to add filters etc later
  // with 20 per page pagination
  const query = `SELECT * FROM orders WHERE shop_id = ${shopId} ORDER BY updated_at DESC LIMIT ${offset}, ${countPerPage}`;
  try {
    const views: OrderViewType[] = yield call(request, requestURL, {
      method: 'POST',
      body: query,
    });
    if (views && views.length > 0) {
      yield put(actions.viewsLoaded(views));
      yield put(uiActions.actionSucceeded(actions.loadViews()));
    } else {
      yield put(actions.orderError(OrderErrorType.SHOP_HAS_NO_ORDERS));
    }
  } catch (err) {
    yield put(
      uiActions.actionFailed({
        action: actions.loadViews(),
        error: (err as ResponseError).message,
      }),
    );
  } finally {
    yield put(uiActions.stopAction(actions.loadViews()));
  }
}

export function* watchLoadViews() {
  yield takeLatest(actions.loadViews.type, getViews);
}

export function* getOrder(action: PayloadAction<string>) {
  const orderId = action.payload;
  yield put(uiActions.startAction(action));
  yield put(uiActions.clearError(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.orderError(OrderErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/orders/${orderId}`;
  try {
    const order: OrderType = yield call(request, requestURL);
    if (order) {
      yield put(actions.setOrder(order));
      yield put(uiActions.actionSucceeded(action));
    } else {
      // this will be quite weird
      yield put(actions.orderError(OrderErrorType.ORDER_NOT_FOUND));
    }
  } catch (err) {
    yield put(
      uiActions.actionFailed({
        action,
        error: (err as ResponseError).message,
      }),
    );
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetOrder() {
  yield takeLatest(actions.getOrder.type, getOrder);
}

export function* updateOrderStatus(
  action: PayloadAction<{ orderId: string; status: number }>,
) {
  const { orderId, status } = action.payload;
  yield put(uiActions.startAction(action));
  yield put(uiActions.clearError(action));
  const shopId: string = yield select(selectShopId);
  if (shopId.length === 0) {
    yield put(actions.orderError(OrderErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressURL}/shops/${shopId}/orders/${orderId}/set-status`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const empty = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify({ order_id: orderId, status }),
    });
    // we dispatch an action to fetch the updated order
    // as an order update could trigger a series of actions that
    // touch a lot of services and models
    // TODO:(romeo) let the update API return the newly updated
    // order to avoid another roundtrip
    yield put(actions.getOrder(orderId));
    yield put(uiActions.actionSucceeded(action));
  } catch (err) {
    yield put(
      uiActions.actionFailed({
        action,
        error: (err as ResponseError).message,
      }),
    );
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateOrtderStatus() {
  yield takeLatest(actions.updateOrderStatus.type, updateOrderStatus);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* orderSaga() {
  yield all([
    fork(watchLoadOrders),
    fork(watchLoadViews),
    fork(watchGetOrder),
    fork(watchUpdateOrtderStatus),
  ]);
}
