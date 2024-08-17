import * as React from "react";
import {
  Toolbar,
  IconButton,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useRootDispatch, useRootSelector } from "@/stores";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { toggleDrawer } from "@/stores/reducers/sidebarReducer";
import StyledAppBar from "./StyledAppBar";
import { routesConfig } from "@/router/routes";
import LanguageSwitcher from "@/components/language";
import Notification from "./Notification";
import AvatarComponent from "./Avatar";

const AppBar = () => {
  const dispatch = useRootDispatch();
  const { desktopOpen } = useRootSelector((state) => state.sidebar);
  const location = useLocation();

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const pathnames = location.pathname.split("/").filter((x) => x);

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

  const breadcrumbs = React.useMemo(() => {
    return pathnames.map((value, index) => {
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
    });
  }, [pathnames, validateRoute, toPascalCase]);

  return (
    <StyledAppBar open={desktopOpen} position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
       
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            flexGrow: 1,
            "& .MuiBreadcrumbs-separator": { color: "white" },
          }}
        >
          {breadcrumbs}
        </Breadcrumbs>
        <div className="wd-flex wd-items-center wd-gap-2">
          <LanguageSwitcher />
          <Notification />
          <AvatarComponent />
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
