import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const buildRoute = (route: any) => {
  if (route.isAuthenticated) {
    return {
      ...route,
      element: <PrivateRoute>{route.element}</PrivateRoute>,
    };
  }
  return {
    ...route,
    element: <PublicRoute>{route.element}</PublicRoute>,
  };
};

export default buildRoute;
