import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { ProfileType, RegisterLogInType } from 'app/models/user/profile';
import { userActions as actions } from '.';
import { UserErrorType } from './types';
import { selectUserId } from './selectors';
import { theKeepURL } from 'app/endpoints/urls';
import { PayloadAction } from '@reduxjs/toolkit';

export function* register(action: PayloadAction<RegisterLogInType>) {
  const requestURL = `${theKeepURL}/auth/register`;
  try {
    const session: {} = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...action.payload }),
    });
    if (session) {
      yield put(actions.sessionLoaded(session));
      yield put(actions.authenticated(true));
    }
  } catch (err) {
    yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
  }
}
export function* watchSignup() {
  yield takeLatest(actions.signup.type, register);
}

export function* login(action: PayloadAction<RegisterLogInType>) {
  const requestURL = `${theKeepURL}/auth/login`;
  try {
    const session: {} = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify({ ...action.payload }),
    });
    if (session) {
      yield put(actions.sessionLoaded(session));
      yield put(actions.authenticated(true));
    }
  } catch (err) {
    yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
  }
}
export function* watchLogin() {
  yield takeLatest(actions.login.type, login);
}

export function* isAuthenticated() {
  const requestURL = `${theKeepURL}/auth/sessions/is-authenticated`;
  try {
    const resp: boolean = yield call(request, requestURL);
    yield put(actions.authenticated(resp));
  } catch (err) {
    yield put(actions.authenticated(false));
    yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
  }
}
export function* watchIsAuthenticated() {
  yield takeLatest(actions.isAuthenticated.type, isAuthenticated);
}

export function* logout() {
  const requestURL = `${theKeepURL}/auth/logout`;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = yield call(request, requestURL);
    yield put(actions.authenticated(false));
    yield put(actions.profileLoaded({}));
    yield put(actions.sessionLoaded({}));
    yield put(actions.setUser({}));
  } catch (err) {
    yield put(actions.authenticated(false));
    yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
  }
}
export function* watchLogout() {
  yield takeLatest(actions.logout.type, logout);
}

export function* getProfile() {
  const userId: string = yield select(selectUserId);
  if (userId.length === 0) {
    yield put(actions.userError(UserErrorType.USERID_EMPTY));
    return;
  }
  const requestURL = `${theKeepURL}/auth/${userId}/profile`;
  try {
    const profile: ProfileType = yield call(request, requestURL);
    if (profile) {
      yield put(actions.profileLoaded(profile));
    }
  } catch (err) {
    yield put(actions.userError(UserErrorType.RESPONSE_ERROR));
  }
}

export function* watchLoadProfile() {
  yield takeLatest(actions.loadProfile.type, getProfile);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* userSaga() {
  yield all([
    fork(watchLoadProfile),
    fork(watchSignup),
    fork(watchLogin),
    fork(watchIsAuthenticated),
  ]);
}
