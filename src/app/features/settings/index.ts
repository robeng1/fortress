import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Shop } from 'app/models/settings/shop-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import settingsSaga from './saga';
import { SettingsErrorType } from './type';

const settingsNamespace = 'settings';

export type SettingsState = {
  shop: Shop;
  loading: boolean;
  error?: SettingsErrorType | null;
};

export const initialState: SettingsState = {
  shop: {},
  loading: false,
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: settingsNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    getShopByMerchantId: () => {},
    getShop: (state, action: PayloadAction<string>) => {},
    updateShop: (state, action: PayloadAction<Shop>) => {},
    setShop: (state, action: PayloadAction<Shop>) => {
      state.shop = action?.payload;
    },
    settingsError(state, action: PayloadAction<SettingsErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { actions: settingsActions, reducer } = slice;

export const useSettingsSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: settingsSaga });
  return { actions: slice.actions };
};
