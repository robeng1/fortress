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

// Import pages
const Products = lazy(() => import('app/pages/product/Products'));
const Inventory = lazy(() => import('app/pages/inventory/Inventory'));
const Discounts = lazy(() => import('app/pages/discount/Discounts'));
const Collections = lazy(() => import('app/pages/collection/Collections'));
const Orders = lazy(() => import('app/pages/ecommerce/Orders'));
const Account = lazy(() => import('app/pages/settings/Account'));
const Notifications = lazy(() => import('app/pages/settings/Notifications'));
const Apps = lazy(() => import('app/pages/settings/Apps'));
const Plans = lazy(() => import('app/pages/settings/Plans'));
const Billing = lazy(() => import('app/pages/settings/Billing'));
const Feedback = lazy(() => import('app/pages/settings/Feedback'));
const PageNotFound = lazy(() => import('app/pages/utility/PageNotFound'));
const Locations = lazy(() => import('app/pages/settings/Locations'));
const Analytics = lazy(() => import('app/pages/Analytics'));
const Customers = lazy(() => import('app/pages/ecommerce/Customers'));
const Signup = lazy(() => import('app/pages/Signup'));
const Signin = lazy(() => import('app/pages/Signin'));

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
        titleTemplate="%s - Reoplex | Admin"
        defaultTitle="Reoplex Admin"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Reoplex Merchant Admin" />
      </Helmet>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'}>
          <Analytics />
        </Route>
        <Route exact path="/analytics">
          <Analytics />
        </Route>
        <Route exact path="/customers">
          <Customers />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
        <Route exact path="/shop/products">
          <Products />
        </Route>
        <Route exact path="/shop/collections">
          <Collections />
        </Route>
        <Route exact path="/shop/inventory">
          <Inventory />
        </Route>
        <Route exact path="/discounts">
          <Discounts />
        </Route>
        <Route exact path="/analytics/live">
          <Analytics />
        </Route>
        <Route exact path="/analytics/reports">
          <Analytics />
        </Route>
        <Route exact path="/analytics/dashboards">
          <Analytics />
        </Route>
        <Route exact path="/analytics/insights">
          <Analytics />
        </Route>
        <Route exact path="/settings/account">
          <Account />
        </Route>
        <Route exact path="/settings/notifications">
          <Notifications />
        </Route>
        <Route exact path="/settings/apps">
          <Apps />
        </Route>
        <Route exact path="/settings/plans">
          <Plans />
        </Route>
        <Route exact path="/settings/billing">
          <Billing />
        </Route>
        <Route exact path="/settings/feedback">
          <Feedback />
        </Route>
        <Route exact path="/settings/locations">
          <Locations />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
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
