import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { Formik } from 'formik';
import { request, ResponseError } from 'utils/request';
import { domainURL, fortressURL } from 'app/endpoints/urls';
import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import { StartType } from 'app/models/settings/shop-type';
import { useAtom } from 'jotai';
import { useMutation } from 'react-query';
import { sessionAtom } from 'store/atoms/authorization-atom';
import { shopAtom } from 'store/atoms/shop';

interface LocationState {
  from: string;
}

function Signup() {
  const requestURL = `${fortressURL}/shops/get-started`;
  const [session, setSession] = useAtom(sessionAtom);
  const [, setShop] = useAtom(shopAtom);
  const {
    mutate: getStarted,
    isLoading,
    isError,
    error: err,
  } = useMutation(
    (payload: StartType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (resp: Record<string, any>) => {
        setSession(resp.session);
        // TODO: make a call to get the shop
        setShop(resp.shop);
      },
      onError: (e: ResponseError) => {},
    },
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state as LocationState;

  const isAuthenticated = !isEmpty(session);
  const handleSubmit = (values: StartType) => {
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
      navigate(from || '/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, from]);

  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="max-w-sm mx-auto min-h-screen flex flex-col justify-center px-4 py-2">
            <div className="w-full">
              <div>
                <h1 className="mx-auto h-12 text-center text-3xl text-purple-800 w-auto">
                  Reoplex
                </h1>
                {/* <h1 className="text-2xl mt-5 text-gray-800 font-bold mb-6">
                  Create account
                </h1> */}
              </div>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                  business_display_name: '',
                  handle: '',
                }}
                validateOnChange={false}
                validateOnBlur={true}
                validate={async values => {
                  const errors: Record<string, any> = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email,
                    )
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  if (!values.password) {
                    errors.password = 'Required';
                  }
                  if (!values.business_display_name) {
                    errors.business_display_name = 'Required';
                  }
                  if (!values.handle) {
                    errors.handle = 'Required';
                  } else {
                    const handle = slugit(values.handle);
                    const requestURL = `${domainURL}/ask?domain=${handle}`;
                    const exists = await request(requestURL)
                      .then(v => v)
                      .catch(() => false);
                    if (exists === true) {
                      errors.handle = 'Name already taken';
                    }
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleSubmit({
                    ...values,
                    permanent_domain: `${slugit(values.handle)}.reoplex.com`,
                  });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="email"
                          value={values.email}
                          className="form-input w-full"
                          type="email"
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
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className="form-input w-full"
                          type="password"
                          autoComplete="on"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="business_display_name"
                        >
                          Your store name
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="business_display_name"
                          name="business_display_name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.business_display_name}
                          className="form-input w-full"
                          type="text"
                        />
                      </div>

                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="handle"
                        >
                          Your store URL
                        </label>
                        <div className="relative">
                          <input
                            id="handle"
                            name="handle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.handle}
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
                          Your store link eg. https://
                          <b>
                            {values.handle ? slugit(values.handle) : 'name'}
                          </b>
                          .reoplex.com
                        </div>
                      </div>
                    </div>
                    {isError && (
                      <div className="bg-red-100 p-5 w-full sm:w-1/2">
                        <div className="flex space-x-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="flex-none fill-current text-red-500 h-4 w-4"
                          >
                            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
                          </svg>
                          <div className="leading-tight flex flex-col space-y-2">
                            <div className="text-sm font-medium text-red-700">
                              Something went wrong
                            </div>
                            <div className="flex-1 leading-snug text-sm text-red-600">
                              {err?.message}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-right justify-end mt-6">
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
                            onClick={e => handleSubmit()}
                          >
                            Create your store
                          </button>
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </Formik>

              {/* Footer */}
              <div className="pt-5 mt-6 border-t border-gray-200">
                <div className="text-sm">
                  Have an account?{' '}
                  <Link
                    className="font-medium text-purple-500 hover:text-purple-600"
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