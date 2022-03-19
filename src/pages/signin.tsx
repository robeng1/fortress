import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { theKeepURL } from 'endpoints/urls';
import { RegisterLogInType } from 'typings/user/profile';
import { useMutation, useQueryClient } from 'react-query';
import { request, ResponseError } from 'utils/request';
import { useAtom } from 'jotai';
import { sessionAtom } from 'store/authorization-atom';
import Input from 'components/blocks/input';
import PasswordInput from 'components/blocks/password-input';
import Button from 'components/blocks/button';
import { Footer } from 'components/blocks/footer';

interface LocationState {
  from: string;
}

function Signin() {
  const queryClient = useQueryClient();
  const requestURL = `${theKeepURL}/auth/login`;
  const [session, setSession] = useAtom(sessionAtom);
  const {
    mutate: login,
    isLoading,
    isError,
    error: err,
  } = useMutation(
    (payload: RegisterLogInType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: async (s: Record<string, any>) => {
        setSession(s);
        queryClient.prefetchQuery(['shop', s?.identity?.account_id]);
      },
      onError: (e: ResponseError) => {},
    },
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as LocationState) || { from: '/' };

  const isAuthenticated = !isEmpty(session);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    login({ identifier, password });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from || '/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, from]);

  return (
    <div className="flex flex-col md:items-center md:justify-center h-screen bg-slate-100 sm:bg-gray-100">
      <div className="md:m-auto max-w-md w-full bg-white sm:shadow p-5 sm:p-8 rounded">
        <h1 className="flex justify-center mb-2 mx-auto h-12 text-center text-3xl text-purple-800 w-auto">
          Reoplex
        </h1>
        <h3 className="text-start font-semibold text-base text-body mb-6 mt-4">
          Welcome back!
        </h3>
        {/* Form */}
        <div>
          <div className="space-y-4">
            <Input
              label="Email, phone or username"
              id="identifier"
              name="identifier"
              type="text"
              onChange={e => setIdentifier(e.target.value)}
            />

            <PasswordInput
              id="password"
              forgotPassHelpText="Forgot your password?"
              forgotPageLink="/reset-password"
              name="password"
              type="password"
              autoComplete="on"
              onChange={e => setPassword(e.target.value)}
              label={'Password'}
              error={undefined}
            />
          </div>
          {isError && <span>{err?.message}</span>}
          <Button
            className="w-full mt-3 btn bg-purple-600 hover:bg-purple-600 text-white"
            loading={isLoading}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Login
          </Button>
        </div>
        <div className="pt-5 mt-6 border-t border-gray-200">
          <div className="text-sm">
            Don’t have an account?{' '}
            <Link
              className="font-bold text-indigo-500 hover:text-indigo-600"
              to="/signup"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-md self-start">
        <Footer />
      </div>
    </div>
  );
}

export default Signin;
