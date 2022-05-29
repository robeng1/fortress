import { theKeepURL } from "endpoints/urls"
import { useAtom } from "jotai"
import { useQuery } from "react-query"
import { sessionAtom, sidAtom } from "store/authorization-atom"
import { request, ResponseError } from "utils/request"
import { Session } from "typings/user/session"
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

export function useSession() {
  const sid: string = useAtom(sidAtom) as unknown as string
  const [sess, setSession] = useAtom(sessionAtom)
  let {
    data: session,
    refetch,
    isLoading,
    isIdle,
    isRefetching,
  } = useQuery<Session>(["session_load", sid], () => loadSession(sid), {
    enabled:
      !!sid && sid != undefined && !sess.identity?.email_verification_required,
    keepPreviousData: true,
  })
  if (session) {
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
