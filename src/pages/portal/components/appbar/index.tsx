import * as React from "react";
import { Toolbar, IconButton, Breadcrumbs } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import StyledAppBar from "./StyledAppBar";
import LanguageSwitcher from "@/components/language";
import Notification from "../notification";
import ProfileMenu from "../profile_menu";
import useAppBar from "./useAppBar";

const AppBar = () => {
  const {
    desktopOpen,
    handleDrawerToggle,
    generateBreadcrumb,
    pathnames,
    validateRoute,
    toPascalCase,
  } = useAppBar();
  const breadcrumbs = React.useMemo(() => {
    return pathnames.map(generateBreadcrumb);
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
          <ProfileMenu />
        </div>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
