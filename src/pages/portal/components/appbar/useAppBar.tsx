import { routesConfig } from "@/router/routes";
import { useRootDispatch, useRootSelector } from "@/stores";
import { toggleDrawer } from "@/stores/reducers/sidebarReducer";
import { Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";

const useAppBar = () => {
  const dispatch = useRootDispatch();
  const location = useLocation();
  const { desktopOpen } = useRootSelector((state) => state.sidebar);
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const toPascalCase = (str: string) => {
    return str.replace(
      /\w+/g,
      (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
    );
  };

  const validateRoute = (path: string) => {
    const allPaths = routesConfig
      .map((route) => {
        if (route.children) {
          return [
            route.path,
            ...route.children.map(
              (child) => `${route.path}/${child.path ?? ""}`
            ),
          ];
        }
        return route.path ?? "";
      })
      .flat()
      .filter((path) => path !== undefined && !path.includes(":"))
      .filter((path) => path !== "/")
      .filter((path) => path !== "");

    return allPaths.includes(path);
  };

  const generateBreadcrumb = (value: string, index: number) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const isLast = index === pathnames.length - 1;
    const formattedValue = value.replace(/-/g, " ");
    const isValid = validateRoute(to);

    if (isLast) {
      return (
        <Typography color="white" sx={{ fontWeight: "bold" }} key={to}>
          {toPascalCase(formattedValue)}
        </Typography>
      );
    } else if (!isValid) {
      return (
        <Typography color="white" key={to}>
          {toPascalCase(formattedValue)}
        </Typography>
      );
    } else {
      return (
        <Link
          underline="hover"
          color="white"
          component={RouterLink}
          to={to}
          key={to}
        >
          {toPascalCase(formattedValue)}
        </Link>
      );
    }
  };

  return {
    pathnames,
    desktopOpen,
    validateRoute,
    toPascalCase,
    handleDrawerToggle,
    generateBreadcrumb,
  };
};

export default useAppBar;
