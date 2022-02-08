/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import * as React from 'react';
import { Provider } from 'jotai';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './css/style.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { App, Loader } from './index';

import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@mui/material/styles';


import theme from './styles/mui-theme/theme';

const queryClient = new QueryClient();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <Provider>
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