import { RoomContext, AuthProvider } from "./context";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";
import "./style/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RoomContext>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </RoomContext>
);
