import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "animate.css";
import { JobContextProvider } from "./context/jobContext.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <JobContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </JobContextProvider>
  </StrictMode>
);
