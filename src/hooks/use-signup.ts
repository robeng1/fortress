import { fortressURL } from 'endpoints/urls';
import isEmpty from 'lodash/isEmpty';
import { useAtom } from 'jotai';
import { StartType } from 'typings/settings/shop-type';
import { useEffect } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { sessionAtom } from 'store/authorization-atom';
import { request, ResponseError } from 'utils/request';
interface LocationState {
  from: string;
}

export function useSignup() {
  const queryClient = useQueryClient();
  const requestURL = `${fortressURL}/shops/get-started`;
  const [session, setSession] = useAtom(sessionAtom);
  const {
    mutate: getStarted,
    isLoading,
    isError,
    error,
  } = useMutation(
    (payload: StartType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (resp: Record<string, any>) => {
        setSession(resp.session);
        queryClient.setQueryData(
          ['shop', resp.session.identity.account_id],
          resp.shop,
        );
      },
      onError: (e: ResponseError) => {},
    },
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = { from: '/onboarding/currency' };

  const isAuthenticated = !isEmpty(session);
  const submitData = (values: StartType) => {
    getStarted({ ...values });
  };
  const slugit = (txt: string) =>
    slugify(txt, {
      replacement: '-',
      lower: true,
      strict: true,
      trim: true,
    });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || '/onboarding/currency');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, from]);
  return {
    submitData,
    slugit,
    isError,
    isLoading,
    error,
  };
}
