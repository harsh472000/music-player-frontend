import { Navigate, useRoutes } from "react-router-dom";

import LoginRoutes from "./LoginRoutes";
import DashboardRoutes from "./DashboardRoutes";

import Home from "../pages/Home";

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    LoginRoutes,
    DashboardRoutes,
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);
}
