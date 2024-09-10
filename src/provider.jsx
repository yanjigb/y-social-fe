import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { persistor, store } from "./redux/store";
import { ThemeProvider as ThemeCustomProvider } from "./providers/theme-provider";

import "./index.css";

function MainProvider({ children }) {
    return (
        <Provider store={store}>
            <ThemeCustomProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        {children}
                    </Router>
                </PersistGate>
            </ThemeCustomProvider>
        </Provider>
    )
}

export default MainProvider
