import { RoomContext, AuthProvider } from "./context";
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App";


ReactDOM.createRoot(document.getElementById("root")).render(
  <RoomContext>
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </RoomContext>
);
