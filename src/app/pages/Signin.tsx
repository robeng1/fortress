import React, { useState, useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { theKeepURL } from 'app/endpoints/urls';
import { RegisterLogInType } from 'app/models/user/profile';
import { useMutation } from 'react-query';
import { request, ResponseError } from 'utils/request';
import { useAtom } from 'jotai';
import { sessionAtom } from 'store/atoms/authorization-atom';

interface LocationState {
  from: string;
}

function Signin() {
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
      onSuccess: (resp: Record<string, any>) => {
        setSession(session);
      },

      onError: (e: ResponseError) => {},
    },
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state as LocationState;

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
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="max-w-sm mx-auto min-h-screen flex flex-col justify-center px-4 py-8">
            <div className="w-full">
              <div>
                <h1 className="mx-auto h-12 text-center text-3xl text-purple-800 w-auto">
                  Reoplex
                </h1>
                <h1 className="text-3xl mt-5 text-gray-800 font-bold mb-6">
                  Welcome back!
                </h1>
              </div>
              {/* Form */}
              <div>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="identifier"
                    >
                      Email, phone, username
                    </label>
                    <input
                      id="identifier"
                      className="form-input w-full border focus:outline-none rounded shadow bg-white"
                      type="text"
                      onChange={e => setIdentifier(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      className="form-input w-full border focus:outline-none rounded shadow bg-white"
                      type="password"
                      autoComplete="on"
                      onChange={e => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                {isError && <span>{err?.message}</span>}
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  {isLoading && (
                    <div className="m-1.5">
                      <button
                        className="btn bg-purple-500 hover:bg-purple-600 text-white disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed shadow-none ml-3"
                        disabled
                      >
                        <svg
                          className="animate-spin w-4 h-4 fill-current flex-shrink-0"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                        </svg>
                        <span className="ml-2">Loading</span>
                      </button>
                    </div>
                  )}
                  {!isLoading && (
                    <div className="m-1.5">
                      <button
                        className="btn bg-purple-500 hover:bg-purple-600 text-white ml-3"
                        onClick={handleSubmit}
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-200">
                <div className="text-sm">
                  Don’t you have an account?{' '}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div
          className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2"
          aria-hidden="true"
        >
          <img
            className="object-cover object-center w-full h-full"
            src={AuthImage}
            width="760"
            height="1024"
            alt="Authentication"
          />
          <img
            className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8"
            src={AuthDecoration}
            width="218"
            height="224"
            alt="Authentication decoration"
          />
        </div>
      </div>
    </main>
  );
}

export default Signin;
