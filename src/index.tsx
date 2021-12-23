/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'css/style.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { App, Loader } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import { ThemeProvider } from '@mui/material/styles';

import reportWebVitals from 'reportWebVitals';

// Initialize languages
import './locales/i18n';

import theme from './styles/mui-theme/theme';
import { loadState } from 'store/state';

const queryClient = new QueryClient();
// Create redux store with history
const initialState = loadState();
const { store } = configureAppStore(initialState);
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <React.StrictMode>
          <Router>
            <React.Suspense fallback={<Loader />}>
              <QueryClientProvider client={queryClient}>
                <App />
                <ToastContainer />
              </QueryClientProvider>
            </React.Suspense>
          </Router>
        </React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </Provider>,
  MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
