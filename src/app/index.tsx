/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, lazy } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';

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
import Policies from 'app/pages/settings/Policies';
// import SalesChannels from 'app/pages/settings/SalesChannels';
// import Feedback from 'app/pages/settings/Feedback';
import PageNotFound from 'app/pages/utility/PageNotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import { useUISlice } from './features/ui';
import { useAuthnSlice } from './features/authn';

// const Locations = lazy(() => import('app/pages/settings/Locations'));
const Signup = lazy(() => import('app/pages/Signup'));
const Signin = lazy(() => import('app/pages/Signin'));
const ResetPassword = lazy(() => import('app/pages/ResetPassword'));

export function App() {
  // hook up these two reducers when the app starts
  // since they are used throughout the app
  useUISlice();
  useAuthnSlice();
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
      <Switch>
        <ProtectedRoute
          exact
          path={process.env.PUBLIC_URL + '/'}
          component={Analytics}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/analytics"
          component={Analytics}
        ></ProtectedRoute>
        {/* <ProtectedRoute
          exact
          path="/customers"
          component={Customers}
        ></ProtectedRoute> */}
        <ProtectedRoute
          exact
          path="/orders"
          component={Orders}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/shop/products"
          component={Products}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/shop/collections"
          component={Collections}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/shop/inventory"
          component={Inventory}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/discounts"
          component={Discounts}
        ></ProtectedRoute>
        {/* <ProtectedRoute
          exact
          path="/analytics/live"
          component={Analytics}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/analytics/reports"
          component={Analytics}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/analytics/dashboards"
          component={Analytics}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/analytics/insights"
          component={Analytics}
        ></ProtectedRoute> */}

        <ProtectedRoute
          exact
          path="/settings/account"
          component={Account}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/payments"
          component={Payments}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/locations"
          component={Locations}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/policies"
          component={Policies}
        ></ProtectedRoute>
        {/* <ProtectedRoute
          exact
          path="/settings/sales-channels"
          component={SalesChannels}
        ></ProtectedRoute> */}
        {/* <ProtectedRoute
          exact
          path="/settings/feedback"
          component={Feedback}
        ></ProtectedRoute> */}
        {/* <ProtectedRoute
          exact
          path="/settings/locations"
          component={Locations}
        ></ProtectedRoute> */}

        <Route exact path="/signup" component={Signup}></Route>
        <Route exact path="/signin" component={Signin}></Route>
        <Route exact path="/reset-password" component={ResetPassword}></Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
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
