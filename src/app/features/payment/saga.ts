import { PayloadAction } from '@reduxjs/toolkit';
import { paymentURL } from 'app/endpoints/urls';
import { Account } from 'app/models/payment/account-type';
import { TransferType } from 'app/models/payment/transfer';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { paymentActions as actions } from '.';
import { uiActions } from '../ui';
import { selectUserID } from './selectors';
import { PaymentErrorType } from './types';

export function* createAccount(action: PayloadAction<Account>) {
  yield put(uiActions.startAction(action));
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.paymentError(PaymentErrorType.USERID_EMPTY));
    return;
  }
  const requestURL = `${paymentURL}/${userID}/accounts`;
  try {
    const account: Account = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (account) {
      yield put(actions.setAccount(account));
    }
  } catch (err) {
    yield put(actions.paymentError(PaymentErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchCreateAccount() {
  yield takeLatest(actions.createAccount.type, createAccount);
}

export function* updateAccount(action: PayloadAction<Account>) {
  yield put(uiActions.startAction(action));
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.paymentError(PaymentErrorType.USERID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${paymentURL}/${userID}/accounts/${body.account_id}`;

  try {
    const account: Account = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(action?.payload),
    });

    if (account) {
      yield put(actions.setAccount(account));
    }
  } catch (err) {
    yield put(actions.paymentError(PaymentErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchUpdateAccount() {
  yield takeLatest(actions.updateAccount.type, updateAccount);
}

export function* getAccount(action: PayloadAction<string>) {
  yield put(uiActions.startAction(action));
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.paymentError(PaymentErrorType.USERID_EMPTY));
    return;
  }
  const accountId = action?.payload;
  const requestURL = `${paymentURL}/${userID}/accounts/${accountId}`;
  try {
    const account: Account = yield call(request, requestURL);
    if (account) {
      yield put(actions.setAccount(account));
    }
  } catch (err) {
    yield put(actions.paymentError(PaymentErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}

export function* watchGetAccount() {
  yield takeLatest(actions.getAccount.type, getAccount);
}

export function* withdraw(action: PayloadAction<TransferType>) {
  yield put(uiActions.startAction(action));
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.paymentError(PaymentErrorType.USERID_EMPTY));
    return;
  }
  const transfer = action?.payload;
  const requestURL = `${paymentURL}/${userID}/accounts/${transfer.source_id}/withdraw`;
  try {
    const returnedTrns: TransferType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ transfer }),
    });

    if (returnedTrns) {
      // the withrawal succeeded, do sth with the it
    }
  } catch (err) {
    yield put(actions.paymentError(PaymentErrorType.RESPONSE_ERROR));
  } finally {
    yield put(uiActions.stopAction(action));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export default function* accountSaga() {
  yield all([
    fork(watchCreateAccount),
    fork(watchUpdateAccount),
    fork(watchGetAccount),
  ]);
}
