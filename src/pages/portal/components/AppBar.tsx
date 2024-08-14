import * as React from "react";
import {
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  Breadcrumbs,
  Link,
  Typography,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useRootDispatch, useRootSelector } from "stores";
import { useLocation, Link as RouterLink } from "react-router-dom";

import { toggleDrawer } from "stores/reducers/sidebarReducer";

import StyledAppBar from "./StyledAppBar";
import usePanel from "../usePanel";

const AppBar = () => {
  const dispatch = useRootDispatch();
  const { desktopOpen } = useRootSelector((state) => state.sidebar);
  const location = useLocation();

  const { logout, profileQuery } = usePanel();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    dispatch(toggleDrawer());
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const user = React.useMemo(
    () => profileQuery.data?.data,
    [profileQuery.data?.data]
  );

  const stringAvatar = React.useMemo(() => {
    if (!user?.name) return {};
    return {
      alt: "User Avatar",
      src: user.imagePath
        ? `${import.meta.env.VITE_API_URL}/${user.imagePath}`
        : undefined,
      children: user.imagePath ? undefined : (
        <span className="wd-text-base wd-font-medium ">
          {`${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`}
        </span>
      ),
    };
  }, [user?.name, user?.imagePath]);

  const pathnames = location.pathname.split("/").filter((x) => x);

  const toPascalCase = (str: string) => {
    return str.replace(
      /\w+/g,
      (word) => word[0].toUpperCase() + word.slice(1).toLowerCase()
    );
  };

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
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography color="white" sx={{ fontWeight: "bold" }} key={to}>
                {toPascalCase(value)}
              </Typography>
            ) : (
              <Link
                underline="hover"
                color="white"
                component={RouterLink}
                to={to}
                key={to}
              >
                {toPascalCase(value)}
              </Link>
            );
          })}
        </Breadcrumbs>

        <IconButton onClick={handleAvatarClick} color="inherit">
          <Avatar {...stringAvatar} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <Avatar  {...stringAvatar} />

            <Box
              sx={{
                ml: 2,
              }}
            >
              <p className="wd-text-base wd-font-medium">{user?.name ?? "-"}</p>

              <p className="wd-text-sm wd-text-gray-500">
                {user?.email ?? "-"}
              </p>
            </Box>
          </Box>

          <Divider />

          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>

          <MenuItem onClick={handleMenuClose}>My account</MenuItem>

          <MenuItem
            onClick={() => {
              logout();
              handleMenuClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
