import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './css/style.scss';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import { App } from './index';
import { Provider, useAtom } from 'jotai';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider as EmotionThemeProvider } from './styles/emotion';

const klient = new QueryClient();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <QueryClientProvider client={klient}>
    <Provider>
      <EmotionThemeProvider>
        <HelmetProvider>
          <React.StrictMode>
            <Router>
              <App />
              <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                toastOptions={{
                  className: '',
                  style: {
                    // border: '1px solid #713200',
                    padding: '16px',
                    // color: '#713200',
                  },
                  // iconTheme: {
                  //   primary: '#713200',
                  //   secondary: '#FFFAEE',
                  // },
                }}
              />
            </Router>
          </React.StrictMode>
        </HelmetProvider>
      </EmotionThemeProvider>
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE,
);
