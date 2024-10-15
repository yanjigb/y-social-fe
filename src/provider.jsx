/* eslint-disable react/prop-types */
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "yet-another-react-lightbox/styles.css";

import { persistor, store } from "./redux/store";
import { ThemeProvider as ThemeCustomProvider } from "./providers/theme-provider";
import { ToastProvider } from "./context/toast";
import "./index.css";

function MainProvider({ children }) {
  return (
    <Provider store={store}>
      <ThemeCustomProvider>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <ToastProvider>{children}</ToastProvider>
          </Router>
        </PersistGate>
      </ThemeCustomProvider>
    </Provider>
  );
}

export default MainProvider;
