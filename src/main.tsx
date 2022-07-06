import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./Router";
import { BrowserRouter } from "react-router-dom";
import "@styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>
);
