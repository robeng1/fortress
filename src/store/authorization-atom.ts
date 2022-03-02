import { atom } from 'jotai';
import { atomWithStorage, selectAtom } from 'jotai/utils';
import { SESSION } from 'lib/contants';
const initialState: Record<string, any> = {};
export const sessionAtom = atomWithStorage(SESSION, initialState);
export const clearSessionAtom = atom(null, (_get, set, _data) => {
  return set(sessionAtom, {});
});
export const UidAtom = selectAtom(
  sessionAtom,
  session => session?.identity?.account_id,
);
