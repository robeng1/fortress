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
import BottomNav from 'app/components/BottomNav';
// Import pages

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

// import { GlobalStyle } from 'styles/global-styles';

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
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
      <div className="md:hidden">
        <BottomNav />
      </div>
      {/* <GlobalStyle /> */}
    </>
  );
}
