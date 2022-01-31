/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

import { useTranslation } from 'react-i18next';
// import Dashboard from 'app/pages/Dashboard';
import Analytics from 'app/pages/Analytics';
// import Customers from 'app/pages/customers/Customers';
import Products from 'app/pages/product/Products';
import Inventory from 'app/pages/inventory/Inventory';
import Discounts from 'app/pages/discount/Discounts';
import Collections from 'app/pages/collection/Collections';
import Orders from 'app/pages/orders/Orders';
import Account from 'app/pages/settings/Account';
import Payments from 'app/pages/settings/Payments';
import Locations from 'app/pages/settings/Centres';
import Rates from 'app/pages/settings/Rates';
import Policies from 'app/pages/settings/Policies';
// import SalesChannels from 'app/pages/settings/SalesChannels';
// import Feedback from 'app/pages/settings/Feedback';
import PageNotFound from 'app/pages/utility/PageNotFound';
import { RequireAuth } from './components/ProtectedRoutes';

// const Locations = lazy(() => import('app/pages/settings/Locations'));
const Signup = lazy(() => import('app/pages/Signup'));
const Signin = lazy(() => import('app/pages/Signin'));
const ResetPassword = lazy(() => import('app/pages/ResetPassword'));

export function App() {
  const location = useLocation();
  useEffect(() => {
    //@ts-ignore
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    //@ts-ignore
    document.querySelector('html').style.scrollBehavior = '';
    //@ts-ignore
    focusHandling('outline');
  }, [location.pathname]); // triggered on route change
  const { i18n } = useTranslation();
  return (
    <>
      <Helmet
        titleTemplate="%s - Reoplex | Seller | Dashboard"
        defaultTitle="Reoplex Dashboard"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Reoplex Merchant Dashboard" />
      </Helmet>
      <Routes>
        <Route
          path={process.env.PUBLIC_URL + '/'}
          element={
            <RequireAuth path={process.env.PUBLIC_URL + '/'}>
              <Analytics />
            </RequireAuth>
          }
        />
        <Route
          path="/analytics"
          element={
            <RequireAuth path="/analytics">
              <Analytics />
            </RequireAuth>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireAuth path="/orders">
              <Orders />
            </RequireAuth>
          }
        />

        <Route
          path="/shop/products"
          element={
            <RequireAuth path="/shop/products">
              <Products />
            </RequireAuth>
          }
        />

        <Route
          path="/shop/collections"
          element={
            <RequireAuth path="/shop/collections">
              <Collections />
            </RequireAuth>
          }
        />

        <Route
          path="/shop/inventory"
          element={
            <RequireAuth path="/shop/inventory">
              <Inventory />
            </RequireAuth>
          }
        />

        <Route
          path="/discounts"
          element={
            <RequireAuth path="/discounts">
              <Discounts />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/account"
          element={
            <RequireAuth path="/settings/account">
              <Account />
            </RequireAuth>
          }
        />

        <Route
          path="/settings/payments"
          element={
            <RequireAuth path="/settings/payments">
              <Payments />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/locations"
          element={
            <RequireAuth path="/settings/locations">
              <Locations />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/shipping"
          element={
            <RequireAuth path="/settings/shipping">
              <Rates />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/policies"
          element={
            <RequireAuth path="/settings/policies">
              <Policies />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </>
  );
}

export const Loader = () => {
  return (
    <div className="flex h-screen justify-center self-center align-middle items-center content-center">
      <div
        style={{ borderTopColor: 'transparent' }}
        className="w-16 h-16 border-4 border-purple-400 border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};
