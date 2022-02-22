/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import * as React from 'react';
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
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <React.StrictMode>
          <Router>
            <App />
            <ToastContainer />
          </Router>
        </React.StrictMode>
      </HelmetProvider>
    </ThemeProvider>
  </QueryClientProvider>,
  MOUNT_NODE,
);
