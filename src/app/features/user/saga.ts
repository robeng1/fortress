import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { ProfileType } from 'app/models/user/profile';
import { userActions as actions } from '.';
import { UserErrorType } from './types';
import { selectUserID } from './selectors';

export function* getProfile(action: any) {
  const userID: string = yield select(selectUserID);
  if (userID.length === 0) {
    yield put(actions.userError(UserErrorType.USERID_EMPTY));
    return;
  }
  const accountId = action?.payload as string;
  const requestURL = `https://api.reoplex.com/payments/${userID}/accounts/${accountId}`;
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
  yield all([fork(watchLoadProfile)]);
}
