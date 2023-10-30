import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <ToastContainer />
  </React.StrictMode>
);
