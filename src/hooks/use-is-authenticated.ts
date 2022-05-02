import { theKeepURL } from 'endpoints/urls';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { sidAtom } from 'store/authorization-atom';
import { request } from 'utils/request';
const authCheck = async (id?: string) => {
  try {
    const resp = await request(`${theKeepURL}/auth/sessions/${id}/is-authenticated`);
    return resp.bool ?? false;
  } catch (error) {
    return false;
  }
};

export function useIsAutenticated() {
  const sid: string = useAtom(sidAtom) as unknown as string;
  let {
    data: isAuthenticated,
  } = useQuery<boolean>(['session_load', sid], () => authCheck(sid), {
    enabled: !!sid && sid != undefined,
    keepPreviousData: true,
  });

  return {
    isAuthenticated
  };
}
