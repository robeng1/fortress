import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const voucherState = (state: RootState) => state.voucher;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

export const selectOffset = createSelector([voucherState], d => d?.offset || 1);
export const selectCount = createSelector(
  [voucherState],
  d => d?.num_per_page || 20,
);

export const selectVoucherViews = createSelector(
  [voucherState],
  d => d?.views || [],
);

export const selectHasVouchers = createSelector(
  [selectVoucherViews],
  d => d && d.length > 0,
);

export const selectVoucherById = (state: RootState, voucherId: string) =>
  state.voucher?.vouchers[voucherId];

export const selectVouchersBySetId = (state: RootState, setId: string) =>
  Object.values(state.voucher?.vouchers || []).filter(
    x => x.voucher_set_id === setId,
  );
