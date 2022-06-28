import { theKeepURL } from "endpoints/urls"
import { useAtom } from "jotai"
import { useQuery } from "react-query"
import { clearSessionAtom, sessionAtom, sidAtom } from "store/authorization-atom"
import { request, ResponseError } from "utils/request"
import { Session } from "typings/user/session"
import isEmpty from "lodash"
const emptySession = {}

const loadSession = async (id?: string) => {
  try {
    const resp = await request(`${theKeepURL}/auth/sessions/${id}/reload`)
    const session: Session = resp
    return session
  } catch (error) {
    return emptySession
  }
}

const refreshSession = async (id?: string) => {
  try {
    const resp = await request(`${theKeepURL}/auth/sessions/${id}/refresh`)
    const session: Session = resp
    return session
  } catch (error) {
    return emptySession
  }
}

export function useSession() {
  const [sid, _] = useAtom(sidAtom)
  const [sess, setSession] = useAtom(sessionAtom)
  const [, clearSession] = useAtom(clearSessionAtom)
  let {
    data: session,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<Session>(["refresh-session", sid], () => refreshSession(sid), {
    enabled: !!sid && sid != undefined,
    keepPreviousData: true,
    staleTime: 60000 * 59,
  })
  if (session && !isEmpty(session)) {
    setSession(session)
  } else {
    session = sess
  }
  const isEmailVerified: boolean = !(
    session?.identity?.email_verification_required ?? false
  )

  return {
    session,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
    isEmailVerified,
  }
}
