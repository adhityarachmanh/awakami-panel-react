import * as React from "react";
import {
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useRootDispatch, useRootSelector } from "stores";

import { toggleDrawer } from "stores/reducers/sidebarReducer";

import StyledAppBar from "./StyledAppBar";
import usePanel from "../usePanel";

const AppBar = () => {
  const dispatch = useRootDispatch();
  const { desktopOpen } = useRootSelector((state) => state.sidebar);

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
      sx: {
        mr: 2,
      },
      alt: "User Avatar",
      src: user.imagePath ? `${import.meta.env.VITE_API_URL}/${user.imagePath}` : undefined,
      children: user.imagePath ? undefined : (
        <p className="wd-text-base wd-font-medium">
          {`${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`}
        </p>
      ),
    };
  }, [user?.name, user?.imagePath]);

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

        <h3 className="wd-text-xl wd-font-semibold wd-whitespace-nowrap wd-flex-grow">
          Responsive drawer
        </h3>

        <IconButton onClick={handleAvatarClick} color="inherit">
          <Avatar {...stringAvatar} />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <Avatar {...stringAvatar} />

            <Box>
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
