import React, { useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import PasswordInput from 'components/common/password-input';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { Footer } from 'components/common/footer';
import { useSignup } from 'hooks/use-signup';
import { useHandleValidator } from 'hooks/use-validate-handle';

function Signup() {
  const { isHandleUnique } = useHandleValidator();
  const { submitData, slugit, isLoading, isError, error: err } = useSignup();

  const formSchema = yup.object().shape({
    email: yup.string().email('Not a valid email').required('Required'),
    password: yup.string().required('Required'),
    handle: yup
      .string()
      .required('Required')
      .test(
        'check-handle-is-unique',
        'Handle is already taken',
        async value => {
          const isValid: boolean = await isHandleUnique(value);
          return !isValid;
        },
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      handle: '',
      password: '',
      business_display_name: '',
    },
    validationSchema: formSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: (values, { setSubmitting }) => {
      submitData({
        ...values,
        business_display_name: values.handle,
        permanent_domain: `${slugit(values.handle)}.myreoplex.com`,
      });
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
  return (
    <div className="flex flex-col md:items-center md:justify-center h-screen bg-slate-100 sm:bg-gray-100">
      <div className="md:m-auto max-w-md w-full bg-white sm:shadow p-5 sm:p-8 rounded">
        <h1 className="flex justify-center mb-2 mx-auto h-12 text-center text-3xl text-purple-800 w-auto">
          Reoplex
        </h1>
        <h3 className="text-start font-semibold text-base text-body mb-6 mt-4">
          Register your business
        </h3>
        <form>
          <div className="space-y-4">
            <Input
              id="email"
              label="Email address*"
              onChange={handleChange}
              onBlur={handleBlur}
              name="email"
              value={values.email}
              type="email"
              error={touched.email ? errors.email : undefined}
            />
            <PasswordInput
              id="password"
              name="password"
              type="password"
              autoComplete="on"
              onChange={handleChange}
              value={values.password}
              onBlur={handleBlur}
              label={'Password*'}
              error={touched.password ? errors.password : undefined}
            />
            <Input
              label="Store handle*"
              id="handle"
              name="handle"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.handle}
              type="text"
              error={touched.handle ? errors.handle : undefined}
            />
          </div>
          {isError && (
            <div className="bg-red-100 p-5 w-full">
              <div className="flex space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="flex-none fill-current text-red-500 h-4 w-4"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z" />
                </svg>
                <div className="leading-tight flex flex-col space-y-2">
                  <div className="flex-1 leading-snug text-sm text-red-600">
                    {err?.message}
                  </div>
                </div>
              </div>
            </div>
          )}
          <Button
            className="w-full mt-3 btn bg-purple-600 hover:bg-purple-600 text-white"
            loading={isLoading}
            type="submit"
            onClick={e => {
              e.stopPropagation();
              handleSubmit();
            }}
            disabled={isLoading || !errors}
          >
            Create store
          </Button>
        </form>
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
