import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';

// First select the relevant part from the state
const settingState = (state: RootState) => state.settings;
const voucherSetState = (state: RootState) => state.voucherset;

export const selectShopId = createSelector(
  [settingState],
  settings => settings?.shop.shop_id || '',
);

// export const selectNextPageToken = createSelector(
//   [voucherSetState],
//   discounts => discounts?.nextPageToken || '',
// );

export const selectOffset = createSelector(
  [voucherSetState],
  d => d?.offset || 1,
);
export const selectCount = createSelector(
  [voucherSetState],
  d => d?.num_per_page || 20,
);

export const selectVoucherSetViews = createSelector(
  [voucherSetState],
  d => d?.views || [],
);

export const selectHasVoucherSets = createSelector(
  [selectVoucherSetViews],
  d => d && d.length > 0,
);

// export const selectVoucherSetById = (state: RootState, voucherSetId: string) =>
//   state.voucherset?.voucherset[voucherSetId];
