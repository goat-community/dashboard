import React from "react";
import ReactDOM from "react-dom/client";
/** Router */
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
/** Assets */
import "@styles/main.scss";
/** Store Providers */
import { Provider } from "react-redux";
import { store } from "@context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
