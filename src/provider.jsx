/* eslint-disable react/react-in-jsx-scope */

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "yet-another-react-lightbox/styles.css";

import { ToastProvider } from "./context/toast";
import "./index.css";
import { ThemeProvider as ThemeCustomProvider } from "./providers/theme-provider";
import { persistor, store } from "./redux/store";

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
