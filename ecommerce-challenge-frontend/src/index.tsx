import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ConfirmDialog from "./components/ConfirmDialog";
import FormDialog from "./components/FormDialog";
import Toasts from "./components/Toast";
import store from "./redux";
import reportWebVitals from "./reportWebVitals";

import "@/utils/auth.utils";
import "react-quill/dist/quill.snow.css";
import "react-tooltip/dist/react-tooltip.css";
import "./styles/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ConfirmDialog />
        <FormDialog />
        <Toasts />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
