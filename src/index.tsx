import React from "react";
import ReactDOM from "react-dom/client";
import "./common/styles/global.scss";
import { Countries } from "./pages/countries/Countries";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <div>
      <Countries />
    </div>
  </React.StrictMode>
);
