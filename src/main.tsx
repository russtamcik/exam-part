import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.tsx";
import ToastContainer from "rsuite/esm/toaster/ToastContainer";

import "antd/dist/reset.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>
);
