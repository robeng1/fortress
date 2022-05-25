import { theKeepURL } from 'endpoints/urls';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { request, ResponseError } from 'utils/request';
function ResetPassword() {
  const requestURL = `${theKeepURL}/auth/password/send-reset`;
  const {
    mutateAsync: sendResetLink,
    isLoading,
    isError,
    error: err,
  } = useMutation(
    (payload: any) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: async (s: Record<string, any>) => {
      },
      onError: (e: ResponseError) => { },
    },
  );
  const [key, setKey] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    toast.promise(
      sendResetLink({ key }),
      {
        loading: "Sending reset link",
        success: "A password reset link has been sent to your email",
        error: null
      })
  };
  return (
    <main className="bg-white">
      <div className="relative md:flex">
        {/* Content */}
        <div className="md:w-1/2">
          <div className="max-w-sm mx-auto min-h-screen flex flex-col justify-center px-4 py-8">
            <div className="w-full">
              <h1 className="text-3xl text-gray-800 font-bold mb-6">
                Reset your Password
              </h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      onChange={e => setKey(e.target.value)}
                      className="form-input w-full"
                      type="email"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="btn bg-purple-600 hover:bg-purple-600 text-white whitespace-nowrap">
                    Send Reset Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResetPassword;
