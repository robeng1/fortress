import { atomWithStorage } from 'jotai/utils';
import { PAYMENT_ACCOUNT } from 'lib/contants';
export const paymentAccountAtom = atomWithStorage(PAYMENT_ACCOUNT, {});
