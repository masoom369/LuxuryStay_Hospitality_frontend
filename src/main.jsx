import { AuthProvider, RoomPackageContext } from "./context";
import { PublicPagesProvider } from "./context/PublicPagesContext";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RoomPackageContext>
      <PublicPagesProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PublicPagesProvider>
    </RoomPackageContext>
  </AuthProvider>
);
