/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'react-quill/dist/quill.snow.css';

import { focusHandling } from 'cruip-js-toolkit';
import './charts/ChartjsConfig';

import { useTranslation } from 'react-i18next';
// Import pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Customers from './pages/ecommerce/Customers';
import Products from './pages/product/Products';
import Inventory from './pages/inventory/Inventory';
import Discounts from './pages/discount/Discounts';
import Collections from './pages/collection/Collections';
import Orders from './pages/ecommerce/Orders';
import Account from './pages/settings/Account';
import Notifications from './pages/settings/Notifications';
import Apps from './pages/settings/Apps';
import Plans from './pages/settings/Plans';
import Billing from './pages/settings/Billing';
import Feedback from './pages/settings/Feedback';
import PageNotFound from './pages/utility/PageNotFound';

import { GlobalStyle } from 'styles/global-styles';

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
        titleTemplate="%s - Reoplex Admin"
        defaultTitle="Reoplex Admin"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Reoplex Merchant Admin" />
      </Helmet>
      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'}>
          <Dashboard />
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
          <Dashboard />
        </Route>
        <Route exact path="/analytics/reports">
          <Dashboard />
        </Route>
        <Route exact path="/analytics/dashboards">
          <Dashboard />
        </Route>
        <Route exact path="/analytics/insights">
          <Dashboard />
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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <GlobalStyle />
    </>
  );
}
