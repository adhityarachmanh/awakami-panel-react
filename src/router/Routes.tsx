import PanelLayout from "@/pages/portal";
import LoginPage from "@/pages/login";
import buildRoute from "./BuildRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Route } from "@/types/route";
import HomePage from "@/pages/home";
import relawanRoutes from "@/pages/relawan/routes";

const routesConfig: Route[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/portal",
    element: <PanelLayout />,
    isAuthenticated: true,
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
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];

export default createBrowserRouter(routesConfig.map(buildRoute));
