import React, { lazy } from "react";

import Loadable from "../components/loader/Loadable";

import DahsboardLayout from "../layouts/DashboardLayout";
import AuthGuard from "../layouts/RouteGuard/AuthGuard";

const DashboardPage = Loadable(lazy(() => import("../pages/dashboard/dashboard")));
const SongPage = Loadable(lazy(() => import("../pages/dashboard/Songs")));

const DashboardRoutes = {
  element: (
    <AuthGuard>
      <DahsboardLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/songs",
      element: <SongPage />,
    },
  ],
};

export default DashboardRoutes;