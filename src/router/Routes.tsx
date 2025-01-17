import PanelLayout from "@/pages/portal";
import LoginPage from "@/pages/login";
import buildRoute from "./BuildRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Route } from "@/types/RouteModel";
import HomePage from "@/pages/home";
import relawanRoutes from "@/pages/relawan/routes";
import tpsRoutes from "@/pages/tps/routes";
import poskoRoutes from "@/pages/posko/routes";
import eventRoutes from "@/pages/event/routes";
import beritaRoutes from "@/pages/berita/routes";
import profileRoutes from "@/pages/profile/routes";
import PortalGuard from "./guard/PortalGuard";
import GuestGuard from "./guard/GuestGuard";

export const routesConfig: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
    GuardComponent: GuestGuard,
  },
  {
    path: "/portal",
    element: <PanelLayout />,
    GuardComponent: PortalGuard,
    children: [
      {
        index: true,
        element: <Navigate to="home" />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      ...relawanRoutes,
      ...tpsRoutes,
      ...poskoRoutes,
      ...eventRoutes,
      ...beritaRoutes,
      ...profileRoutes,
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default createBrowserRouter(routesConfig.map(buildRoute));
