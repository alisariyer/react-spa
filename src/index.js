import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
