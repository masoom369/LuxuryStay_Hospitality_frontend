import { AuthProvider, RoomPackageContext } from "./context";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RoomPackageContext>
      <React.StrictMode>
          <App />
      </React.StrictMode>
    </RoomPackageContext>
  </AuthProvider>
);
