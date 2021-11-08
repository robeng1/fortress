import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ShopType, StartType } from 'app/models/settings/shop-type';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import settingsSaga from './saga';
import { SettingsErrorType } from './type';

const settingsNamespace = 'settings';

export type SettingsState = {
  shop: ShopType;
  error?: SettingsErrorType | null;
};

export const initialState: SettingsState = {
  shop: {},
  error: null,
};

export const slice = createSlice({
  /*namespace for separating related states. Namespaces are like modules*/
  name: settingsNamespace,

  // initialState is the default value of this namespace/module and it is required.
  initialState, // same as initialState: initialState

  reducers: {
    ask: (state, action: PayloadAction<string>) => {},
    getShopByMerchantId: state => {},
    getShop: (state, action: PayloadAction<string>) => {},
    updateShop: (state, action: PayloadAction<ShopType>) => {},
    createShop: (state, action: PayloadAction<ShopType>) => {},
    getStarted: (state, action: PayloadAction<StartType>) => {},
    setShop: (state, action: PayloadAction<ShopType>) => {
      state.shop = action?.payload;
    },
    settingsError(state, action: PayloadAction<SettingsErrorType>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { actions: settingsActions, reducer } = slice;

export const useSettingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: settingsSaga });
  return { actions: slice.actions };
};
