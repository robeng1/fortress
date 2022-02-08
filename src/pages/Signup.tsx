import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import slugify from 'slugify';
import { Formik } from 'formik';
import { request, ResponseError } from 'utils/request';
import { domainURL, fortressURL } from 'endpoints/urls';
import { StartType } from 'models/settings/shop-type';
import { useAtom } from 'jotai';
import { useMutation } from 'react-query';
import { sessionAtom } from 'store/authorization-atom';
import { shopAtom } from 'store/shop';
import PasswordInput from 'components/common/password-input';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { Footer } from 'components/common/footer';

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
  const { from } = (location.state as LocationState) || { from: '/' };

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
    <div className="flex flex-col md:items-center md:justify-center h-screen bg-slate-100 sm:bg-gray-100">
      <div className="md:m-auto max-w-md w-full bg-white sm:shadow p-5 sm:p-8 rounded">
        <h1 className="flex justify-center mb-2 mx-auto h-12 text-center text-3xl text-purple-800 w-auto">
          Reoplex
        </h1>
        <h3 className="text-start font-semibold text-base text-body mb-6 mt-4">
          Register your business
        </h3>
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
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
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
                <Input
                  id="email"
                  label="Email address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                  value={values.email}
                  type="email"
                />
                <PasswordInput
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="on"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={'Password'}
                  error={undefined}
                />
                <Input
                  label="Store name"
                  id="business_display_name"
                  name="business_display_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.business_display_name}
                  type="text"
                />
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
              <Button
                className="w-full mt-3 btn bg-blue-600 hover:bg-purple-600 text-white"
                loading={isLoading}
                onClick={e => handleSubmit()}
                disabled={isLoading}
              >
                Create store
              </Button>
            </form>
          )}
        </Formik>
        <div className="pt-5 mt-6 border-t border-gray-200">
          <div className="text-sm">
            Already have an account?{' '}
            <Link
              className="font-bold text-purple-500 hover:text-purple-600"
              to="/signin"
            >
              Sign In
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

export default Signup;
