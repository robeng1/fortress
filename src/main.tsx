import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './css/style.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { App } from './index';
import { Provider, useAtom } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as EmotionThemeProvider } from './styles/emotion';

const qc = new QueryClient();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <QueryClientProvider client={qc}>
    <Provider>
        <EmotionThemeProvider>
          <HelmetProvider>
            <React.StrictMode>
              <Router>
                <App />
                <ToastContainer />
              </Router>
            </React.StrictMode>
          </HelmetProvider>
        </EmotionThemeProvider>
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE,
);
