import React from 'react';

export default function Login() {
  return (
    <>
      <div className="bg-white font-medium mt-10 mx-auto px-10 py-6 rounded w-400px text-gray-400">
        <h1 className="font-semibold mb-6 text-center">
          Sign up for your account
        </h1>
        <form className="m-0">
          <div>
            <input
              placeholder="Enter email address"
              type="text"
              className="bg-gray-100 block border-2 focus:bg-white focus:border-ocean focus:shadow-none focus:shadow-outline font-sans h-10 hover:bg-gray-200 mb-6 outline-none pl-3 rounded text-sm w-full"
            />
          </div>
          <div>
            <input
              placeholder="Enter full name"
              type="text"
              className="bg-gray-100 block border-2 focus:bg-white text-sm focus:shadow-outline h-10 hover:bg-gray-200 mb-6 outline-none pl-3 rounded w-full focus:shadow-none focus:border-ocean"
            />
          </div>
          <div className="relative">
            <input
              placeholder="Create password"
              type="password"
              className="bg-gray-100 block border-2 focus:bg-white text-sm focus:shadow-outline h-10 hover:bg-gray-200 outline-none pl-3 rounded w-full focus:shadow-none focus:border-ocean"
            />
            <svg
              className="absolute fill-current mr-2 mt-2 right-0 text-gray-600 top-0"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fill-rule="evenodd">
                <path d="M11.983 15.984a4.005 4.005 0 0 1-4.002-4c0-2.206 1.795-4 4.002-4a4.005 4.005 0 0 1 4.002 4c0 2.206-1.795 4-4.002 4M12 4C6.48 4 2 8.84 2 12c0 3.086 4.577 8 10 8s10-4.914 10-8c0-3.16-4.481-8-10-8"></path>
                <circle cx="12" cy="12" r="2"></circle>
              </g>
            </svg>

            <ul className="inline-flex mt-1 w-full">
              <li className="bg-gray-300 h-2px mr-1 w-1/5"></li>
              <li className="bg-gray-300 h-2px mr-1 w-1/5"></li>
              <li className="bg-gray-300 h-2px mr-1 w-1/5"></li>
              <li className="bg-gray-300 h-2px mr-1 w-1/5"></li>
              <li className="bg-gray-300 h-2px mr-1 w-1/5"></li>
            </ul>
          </div>

          <div className="font-normal mb-6 mt-4 text-xs">
            By signing up, you confirm that you’ve read <br />
            and accepted our
            <a href="/" className="text-blue-500">
              User Notice
            </a>
            and
            <a href="/" className="text-blue-500">
              Privacy Policy
            </a>
            .
          </div>
          <button className="bg-indigo border border-indigo h-10 rounded text-white w-full">
            Sign Up
          </button>

          <div className="my-4 text-center text-gray-500 text-xs">OR</div>

          <div>
            <button className="border h-10 inline-flex items-center justify-center rounded-sm shadow-md text-gray-700 w-full">
              <img
                src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/3.4.2/static/media/google-logo.c21ca9d1.svg"
                className="mr-3 w-4"
                alt=""
              />
              <span className="font-semibold text-sm">
                Continue with Google
              </span>
            </button>
          </div>
          <div className="mt-4">
            <button className="border h-10 inline-flex items-center justify-center rounded-sm shadow-md text-gray-700 text-sm w-full">
              <img
                src="https://aid-frontend.prod.atl-paas.net/atlassian-id/front-end/5.0.76/static/media/microsoft-logo.319d9b9a.svg"
                className="mr-3 w-4"
                alt=""
              />
              <span className="font-semibold">Continue with Microsoft</span>
            </button>
          </div>

          <hr className="my-5" />

          <a
            href="/"
            className="block font-normal hover:underline text-center text-sm text-blue-500"
          >
            Already have an Atlassian account? Log in
          </a>
        </form>
      </div>

      <p className="mb-20 mt-6 mx-auto text-center text-w text-xs w-400px text-blue-100">
        This page is protected by reCAPTCHA and the Google Privacy Policy and
        Terms of Service apply
      </p>
    </>
  );
}
