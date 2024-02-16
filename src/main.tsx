import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CTA from "./components/CTA/CTA.tsx";
import Home from "./pages/Home.tsx";
import ServiceStore from "./pages/ServiceStore.tsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <ServiceStore />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
