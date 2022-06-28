import * as React from "react"
import * as ReactDOM from "react-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { registerSW } from 'virtual:pwa-register'

import "./css/style.scss"
import "tippy.js/dist/tippy.css"
import "tippy.js/animations/scale.css"

import { App } from "./index"
import { Provider, useAtom } from "jotai"
import { HelmetProvider } from "react-helmet-async"
import { ThemeProvider as EmotionThemeProvider } from "./styles/emotion"
import { Suspense } from "react"
import { Loader } from "components/loader"

const klient = new QueryClient()
const MOUNT_NODE = document.getElementById("root") as HTMLElement

ReactDOM.render(
  <QueryClientProvider client={klient}>
    <Provider>
      <EmotionThemeProvider>
        <HelmetProvider>
          <React.StrictMode>
            <Router>
              <Suspense fallback={<Loader />}>
                <App />
                <Toaster
                  position="top-center"
                  containerClassName="self-center justify-center align-middle mt-24 my-auto md:mt-2 md:my-2"
                  reverseOrder={false}
                  gutter={8}
                  toastOptions={{
                    className: "",
                    style: {
                      border: "1px solid #713200",
                      padding: "16px",
                      color: "#713200",
                    },
                    iconTheme: {
                      primary: "#713200",
                      secondary: "#FFFAEE",
                    },
                  }}
                />
              </Suspense>
            </Router>
          </React.StrictMode>
        </HelmetProvider>
      </EmotionThemeProvider>
    </Provider>
  </QueryClientProvider>,
  MOUNT_NODE
)

const updateSW = registerSW({
  onNeedRefresh() { },
  onOfflineReady() { },
})