import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuthnSlice } from 'app/features/authn';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function Signin() {
  const { actions } = useAuthnSlice();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(actions.login({ identifier, password }));
  };
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="max-w-sm mx-auto min-h-screen flex flex-col justify-center px-4 py-8">
            <div className="w-full">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
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
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <Link
                      className="text-sm underline hover:no-underline"
                      to="/reset-password"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <button
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3"
                    onClick={handleSubmit}
                  >
                    Sign In
                  </button>
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
