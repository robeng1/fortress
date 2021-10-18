import React from 'react';
import { Link } from 'react-router-dom';

import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';

function Signup() {
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="max-w-sm mx-auto min-h-screen flex flex-col justify-center px-4 py-2">
            <div className="w-full">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h1 className="text-3xl mt-5 text-gray-800 font-bold mb-6">
                  Create account
                </h1>
              </div>

              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      className="form-input w-full"
                      type="email"
                    />
                  </div>
                  {/* <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="name"
                    >
                      Full name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      className="form-input w-full"
                      type="text"
                    />
                  </div> */}
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="store_name"
                    >
                      Your store name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="store_name"
                      className="form-input w-full"
                      type="text"
                    />
                  </div>
                  <div>
                    {/* Start */}
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="url_name"
                      >
                        Your store URL
                      </label>
                      <div className="relative">
                        <input
                          id="url_name"
                          className="form-input w-full pr-8"
                          type="text"
                        />
                        <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                          <span className="text-sm text-gray-400 font-medium px-3">
                            .reoplex.com
                          </span>
                        </div>
                      </div>
                      <div className="text-xs mt-1 text-green-500">
                        Link to your website eg. https://<b>name</b>
                        .reoplex.com
                      </div>
                    </div>
                    {/* End */}
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
                      className="form-input w-full"
                      type="password"
                      autoComplete="on"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="mr-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-sm ml-2">
                        Email me about product news.
                      </span>
                    </label>
                  </div>
                  <Link
                    className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-3 whitespace-nowrap"
                    to="/"
                  >
                    Sign Up
                  </Link>
                </div>
              </form>
              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-200">
                <div className="text-sm">
                  Have an account?{' '}
                  <Link
                    className="font-medium text-indigo-500 hover:text-indigo-600"
                    to="/signin"
                  >
                    Sign In
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

export default Signup;
