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
/** Another Providers */
import { NotifierWrapper } from "@common/Notifier";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <NotifierWrapper />
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
