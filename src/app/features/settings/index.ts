import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShopType } from 'app/models/settings/shop-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import settingsSaga from './saga';
import { SettingsErrorType } from './type';

const settingsNamespace = 'settings';

export type SettingsState = {
  shop: ShopType;
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
    ask: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    getShopByMerchantId: state => {
      state.loading = true;
      state.error = null;
    },
    getShop: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    updateShop: (state, action: PayloadAction<ShopType>) => {
      state.loading = true;
      state.error = null;
    },
    createShop: (state, action: PayloadAction<ShopType>) => {
      state.loading = true;
      state.error = null;
    },
    setShop: (state, action: PayloadAction<ShopType>) => {
      state.shop = action?.payload;
      state.loading = false;
    },
    settingsError(state, action: PayloadAction<SettingsErrorType>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const { actions: settingsActions, reducer } = slice;

export const useSettingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: settingsSaga });
  return { actions: slice.actions };
};
