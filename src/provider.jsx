import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";

import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import { ThemeProvider } from "./providers/theme-provider";

function MainProvider({ children }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <PersistGate loading={null} persistor={persistor}>
                    <Router>
                        {children}
                    </Router>
                </PersistGate>
            </ThemeProvider>
        </Provider>
    )
}

export default MainProvider
