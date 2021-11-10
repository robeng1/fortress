import { RootState } from 'types';

export const selectCodeById = (
  state: RootState,
  id: string,
  codeType: string,
) =>
  codeType === 'single'
    ? state.voucher?.vouchers[id]
    : state.voucherset?.sets[id];
