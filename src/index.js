import ReactDOM from "react-dom/client";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

import App from "./App";
import "./index.css";
import MainProvider from "./provider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <MainProvider>
    <App />
  </MainProvider>,
);

library.add(fab, fas, far);
