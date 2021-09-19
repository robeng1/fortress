import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Account } from 'app/models/payment/account-type';
import { TransferType } from 'app/models/payment/transfer';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import accountSaga from './saga';
import { PaymentErrorType } from './types';

const paymentNamespace = 'payment';

export type PaymentState = {
  account: Account;
  loading: boolean;
  error?: PaymentErrorType | null;
};

export const initialState: PaymentState = {
  account: {},
  loading: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: paymentNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    createAccount: (state, action: PayloadAction<Account>) => {
      state.loading = true;
      state.error = null;
    },
    getAccount: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      state.loading = true;
      state.error = null;
    },
    loadTranactions: state => {
      state.loading = true;
      state.error = null;
    },
    withdraw: (state, action: PayloadAction<TransferType>) => {
      state.loading = true;
      state.error = null;
    },
    setAccount: (state, action: PayloadAction<Account>) => {
      state.account = action?.payload;
      state.loading = false;
    },
    paymentError(state, action: PayloadAction<PaymentErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: paymentActions, reducer } = slice;

export const usePaymentSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: accountSaga });
  return { actions: slice.actions };
};
