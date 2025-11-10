import { AuthProvider, RoomPackageContext } from "./context";
import { RealTimeProvider } from "./context/RealTimeContext";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RoomPackageContext>
      <RealTimeProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </RealTimeProvider>
    </RoomPackageContext>
  </AuthProvider>
);
