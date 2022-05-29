import { Session } from "typings/user/session"
import { atom } from "jotai"
import { atomWithStorage, selectAtom } from "jotai/utils"
import { SESSION } from "lib/contants"
const initialState: Session = {}

export const sessionAtom = atomWithStorage<Session>(SESSION, initialState)

export const clearSessionAtom = atom(null, (_get, set, _data) => {
  return set(sessionAtom, initialState)
})

export const uidAtom = selectAtom(
  sessionAtom,
  (session) => session?.identity?.account_id
)

export const sidAtom = selectAtom(sessionAtom, (session) => session?.id)
