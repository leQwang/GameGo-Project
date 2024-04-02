// import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameDetail from "./pages/GameDetail.tsx";
import Home from "./pages/Home.tsx";
import GameReview from "./pages/GameListing.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/reviews",
    element: <GameReview />,
    children: [],
  },
  {
    path: "/reviews/:gameId",
    element: <GameDetail />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//   <RouterProvider router={router} />,
//   </React.StrictMode>,
// );

// Some Known Bugs:
