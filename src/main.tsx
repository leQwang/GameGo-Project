import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <RouterProvider router={router} />,
  // </React.StrictMode>,
);

// Some Known Bugs:
// -Clicking the same genre or search button will not trigger the useEffect in StoreMain.tsx;
// - 3 cái useEffect trong StoreMain.tsx bị gọi 3 lần getGamesByGenrePageFunc; 