import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { useMutation, useQueryClient } from 'react-query';
import { ShopType } from 'typings/settings/shop-type';
import { request, ResponseError } from 'utils/request';
import { fortressURL } from 'endpoints/urls';
import { uidAtom } from 'store/authorization-atom';
import toast from 'react-hot-toast';
import useShop from 'hooks/use-shop';
import { useOnboarding } from 'hooks/use-onboarding';

function Currency() {
  useOnboarding();
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<string>('GHS')
  const klient = useQueryClient();
  const { shop } = useShop();
  const [accountId] = useAtom(uidAtom);
  const requestURL = `${fortressURL}/shops`;
  // update the shop
  const { mutate: updateShop, isLoading: isUpdatingShop } = useMutation(
    (payload: ShopType) =>
      request(`${requestURL}/${shop?.shop_id}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newShop: ShopType) => {
        klient.setQueryData(['shop', accountId], newShop);
        toast.success('Currency has been updated successfully');
        navigate('/onboarding/payment')
      },
      onError: (e: ResponseError) => {
        toast.error(e.message);
      },
    },
  );
  return (
    <main className="bg-white">
      <div className="relative flex justify-center">

        {/* Content */}
        <div className="w-full md:w-1/2">

          <div className="min-h-screen h-full flex flex-col after:flex-1">

            <div className="flex-1">

              <div className="flex items-center justify-center h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                  Reoplex
                </Link>

              </div>

              {/* Progress bar */}
              <div className="px-4 pt-12 pb-8">
                <div className="max-w-md mx-auto w-full">
                  <div className="relative">
                    <div className="absolute left-0 top-1/2 -mt-px w-full h-0.5 bg-slate-200" aria-hidden="true"></div>
                    <ul className="relative flex justify-between w-full">
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-indigo-500 text-white" to="/onboarding/currency">1</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding/payment">2</Link>
                      </li>
                      <li>
                        <Link className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-semibold bg-slate-100 text-slate-500" to="/onboarding/location">3</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-4 py-8">
              <div className="max-w-md mx-auto">

                <h1 className="text-3xl text-slate-800 font-bold mb-6">What currency will you be selling in? ✨</h1>
                {/* Form */}
                <form>
                  <div className="space-y-3 mb-8">
                    <label className="relative block cursor-pointer">
                      <input onChange={(event) => setCurrency('GHS')} type="radio" checked={currency === 'GHS'} name="radio-buttons" className="peer sr-only"/>
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        
                        <span>GHS</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="relative block cursor-pointer">
                      <input onChange={(event) => setCurrency('ZAR')} type="radio" checked={currency === 'ZAR'} name="radio-buttons" className="peer sr-only" />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        
                        <span>ZAR</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="relative block cursor-pointer">
                      <input onChange={(event) => setCurrency('NGN')} type="radio" checked={currency === 'NGN'} name="radio-buttons" className="peer sr-only" />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        
                        <span>NGN</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                    <label className="relative block cursor-pointer">
                      <input onChange={(event) => setCurrency('USD')} type="radio" checked={currency === 'USD'} name="radio-buttons" className="peer sr-only" />
                      <div className="flex items-center bg-white text-sm font-medium text-slate-800 p-4 rounded border border-slate-200 hover:border-slate-300 shadow-sm duration-150 ease-in-out">
                        <span>USD</span>
                      </div>
                      <div className="absolute inset-0 border-2 border-transparent peer-checked:border-indigo-400 rounded pointer-events-none" aria-hidden="true"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white ml-auto" onClick={(e) => {
                      e.stopPropagation()
                      updateShop({
                        ...shop,
                        currency: {
                          name:'',
                          iso_code: currency ?? 'GHS',
                          symbol: '',
                        },
                      })
                      navigate('/onboarding/payment')
                    }}>Next Step -&gt;</button>
                  </div>
                </form>

              </div>
            </div>

          </div>

        </div>
      </div>

    </main>
  );
}

export default Currency;