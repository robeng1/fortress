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
import Customers from 'app/pages/ecommerce/Customers';
import Products from 'app/pages/product/Products';
import Inventory from 'app/pages/inventory/Inventory';
import Discounts from 'app/pages/discount/Discounts';
import Collections from 'app/pages/collection/Collections';
import Orders from 'app/pages/ecommerce/Orders';
import Account from 'app/pages/settings/Account';
import Notifications from 'app/pages/settings/Notifications';
import Apps from 'app/pages/settings/Apps';
import Plans from 'app/pages/settings/Plans';
import Billing from 'app/pages/settings/Billing';
import Feedback from 'app/pages/settings/Feedback';
import PageNotFound from 'app/pages/utility/PageNotFound';
import ProtectedRoute from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoute';
import { useUISlice } from './features/ui';

const Locations = lazy(() => import('app/pages/settings/Locations'));
const Signup = lazy(() => import('app/pages/Signup'));
const Signin = lazy(() => import('app/pages/Signin'));
const ResetPassword = lazy(() => import('app/pages/ResetPassword'));

export function App() {
  const location = useLocation();
  useUISlice();

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
        titleTemplate="%s - Reoplex | Admin"
        defaultTitle="Reoplex Admin"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Reoplex Merchant Admin" />
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
        <ProtectedRoute
          exact
          path="/customers"
          component={Customers}
        ></ProtectedRoute>
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
        <ProtectedRoute
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
        ></ProtectedRoute>

        <ProtectedRoute
          exact
          path="/settings/account"
          component={Account}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/notifications"
          component={Notifications}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/apps"
          component={Apps}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/plans"
          component={Plans}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/billing"
          component={Billing}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/feedback"
          component={Feedback}
        ></ProtectedRoute>
        <ProtectedRoute
          exact
          path="/settings/locations"
          component={Locations}
        ></ProtectedRoute>

        <PublicRoute exact path="/signup" component={Signup}></PublicRoute>
        <PublicRoute exact path="/signin" component={Signin}></PublicRoute>
        <PublicRoute
          exact
          path="/reset-password"
          component={ResetPassword}
        ></PublicRoute>
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
