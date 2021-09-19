import { PayloadAction } from '@reduxjs/toolkit';
import { fortressApi } from 'app/api/axios';
import {
  ConditionalOfferType,
  OfferListType,
} from 'app/models/discount/discount-type';
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { request, ResponseError } from 'utils/request';
import { discountActions as actions } from '.';
import { selectShopID } from './selectors';
import { OfferErrorType } from './types';

export function* getOffers() {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.discountError(OfferErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/offers`;
  try {
    const offerList: OfferListType = yield call(request, requestURL);
    if (offerList && offerList.offers && offerList.offers.length > 0) {
      yield put(actions.offersLoaded(offerList));
    } else {
      yield put(actions.discountError(OfferErrorType.SHOP_HAS_NO_OFFERS));
    }
  } catch (err) {
    if ((err as ResponseError).response?.status === 404) {
      yield put(actions.discountError(OfferErrorType.SHOP_NOT_FOUND));
    } else {
      yield put(actions.discountError(OfferErrorType.RESPONSE_ERROR));
    }
  }
}

export function* watchLoadOffers() {
  // Watches for loadOffers actions and calls getOffers when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.loadOffers.type, getOffers);
}

export function* createOffer(action: PayloadAction<ConditionalOfferType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.discountError(OfferErrorType.SHOPID_EMPTY));
    return;
  }
  const requestURL = `${fortressApi}/shops/${shopID}/offers`;
  try {
    const offer: ConditionalOfferType = yield call(request, requestURL, {
      method: 'POST',
      body: JSON.stringify(action?.payload),
    });

    if (offer) {
      yield put(
        actions.offersLoaded({
          offers: [offer],
        }),
      );
    }
  } catch (err) {
    yield put(actions.discountError(OfferErrorType.RESPONSE_ERROR));
  }
}

export function* watchCreateOffer() {
  yield takeLatest(actions.createOffer.type, createOffer);
}

export function* updateOffer(action: PayloadAction<ConditionalOfferType>) {
  const shopID: string = yield select(selectShopID);
  if (shopID.length === 0) {
    yield put(actions.discountError(OfferErrorType.SHOPID_EMPTY));
    return;
  }
  const body = action?.payload;
  const requestURL = `${fortressApi}/shops/${shopID}/offers/${body.offer_id}`;
  try {
    const offer: ConditionalOfferType = yield call(request, requestURL, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });

    if (offer) {
      yield put(
        actions.offersLoaded({
          offers: [offer],
        }),
      );
    }
  } catch (err) {
    yield put(actions.discountError(OfferErrorType.RESPONSE_ERROR));
  }
}

export function* watchUpdateOffer() {
  yield takeLatest(actions.updateOffer.type, updateOffer);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* offerSaga() {
  yield all([
    fork(watchLoadOffers),
    fork(watchCreateOffer),
    fork(watchUpdateOffer),
  ]);
}
