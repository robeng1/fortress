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
import 'react-toastify/dist/ReactToastify.css';
import './charts/ChartjsConfig';

import Signup from './pages/signup';
import Signin from './pages/signin';
import Analytics from './pages/analytics';
import Products from './pages/product/products';
import Inventory from './pages/inventory/inventory';
import Discounts from './pages/discount/discounts';
import Collections from './pages/collection/collections';
import Orders from './pages/orders/orders';
import Account from './pages/settings/account';
import Payments from './pages/settings/payments';
import Locations from './pages/settings/centres';
import Rates from './pages/settings/rates';
import Policies from './pages/settings/policies';
import PageNotFound from 'pages/utility/PageNotFound';
import { RequireAuth } from './components/protected-route';
import Transactions from './pages/transactions/Transaction';
import Payouts from './pages/payouts/payout';
import Balance from './pages/balance/balance';
import SettingsIndex from './pages/settings/overview';
import Domains from 'pages/settings/domains';
import ProductMutation from 'pages/product-mutation/form';
import CollectionMutation from 'pages/collection-mutation/form';
import DiscountMutation from 'pages/discount-mutation/form';
import ThemeSettings from 'pages/settings/theme';
import AnnouncementBarMutation from 'pages/settings/theme/announcement-bar';
import FooterMutation from 'pages/settings/theme/footer';
import BannerMutation from 'pages/settings/theme/banner';
import HeroMutation from 'pages/settings/theme/hero';
import FeaturedCollection from 'pages/settings/theme/collection-featured';
import VoucherMutation from 'pages/voucher-mutation/form';
import Vouchers from 'pages/voucher/voucher';
import OnboardingCurrency from 'forms/onboarding/currency';
import OnboardingCentre from 'forms/onboarding/centre';
import OnboardingPayment from 'forms/onboarding/payment';
const ResetPassword = lazy(() => import('pages/reset-password'));

export function App() {
  const location = useLocation();
  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html')!.style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change
  return (
    <>
      <Helmet
        titleTemplate="%s - Reoplex | Seller | Dashboard"
        defaultTitle="Reoplex Dashboard"
        htmlAttributes={{ lang: 'en-US' }}
      >
        <meta name="description" content="Reoplex Merchant Dashboard" />
      </Helmet>
      <Routes>
        <Route
          path={'/onboarding/currency'}
          element={
            <RequireAuth path={'/onboarding/currency'}>
              <OnboardingCurrency />
            </RequireAuth>
          }
        />
        <Route
          path={'/onboarding/location'}
          element={
            <RequireAuth path={'/onboarding/location'}>
              <OnboardingCentre />
            </RequireAuth>
          }
        />
        <Route
          path={'/onboarding/payment'}
          element={
            <RequireAuth path={'/onboarding/payment'}>
              <OnboardingPayment />
            </RequireAuth>
          }
        />
        <Route
          path={'/'}
          element={
            <RequireAuth path={'/'}>
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
          path="/shop/products/:id"
          element={
            <RequireAuth path="/shop/products/:id">
              <ProductMutation />
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
          path="/shop/collections/:id"
          element={
            <RequireAuth path="/shop/collections/:id">
              <CollectionMutation />
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
          path="/finances/balance"
          element={
            <RequireAuth path="/finances/balance">
              <Balance />
            </RequireAuth>
          }
        />
        <Route
          path="/finances/transactions"
          element={
            <RequireAuth path="/finances/transactions">
              <Transactions />
            </RequireAuth>
          }
        />
        <Route
          path="/finances/payouts"
          element={
            <RequireAuth path="/finances/payouts">
              <Payouts />
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
          path="/discounts/:id"
          element={
            <RequireAuth path="/discounts/:id">
              <DiscountMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/vouchers"
          element={
            <RequireAuth path="/vouchers">
              <Vouchers />
            </RequireAuth>
          }
        />
        <Route
          path="/vouchers/:id"
          element={
            <RequireAuth path="/vouchers/:id">
              <VoucherMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth path="/settings">
              <SettingsIndex />
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
          path="/settings/domains"
          element={
            <RequireAuth path="/settings/domains">
              <Domains />
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
        <Route
          path="/settings/theme"
          element={
            <RequireAuth path="/settings/theme">
              <ThemeSettings />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/theme/announcement-bar"
          element={
            <RequireAuth path="/settings/theme/announcement-bar">
              <AnnouncementBarMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/theme/footer"
          element={
            <RequireAuth path="/settings/theme/footer">
              <FooterMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/theme/banner"
          element={
            <RequireAuth path="/settings/theme/banner">
              <BannerMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/theme/hero"
          element={
            <RequireAuth path="/settings/theme/hero">
              <HeroMutation />
            </RequireAuth>
          }
        />
        <Route
          path="/settings/theme/featured-collection"
          element={
            <RequireAuth path="/settings/theme/featured-collection">
              <FeaturedCollection />
            </RequireAuth>
          }
        />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route
          path="*"
          element={
            <RequireAuth path="*">
              <PageNotFound />
            </RequireAuth>
          }
        ></Route>
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
