import {
  Avatar,
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useRootDispatch, useRootSelector } from "@/stores";
import {
  closeDrawer,
  toggleNestedOpen,
  transitionEnd,
} from "@/stores/reducers/sidebarReducer";
import usePanel from "../usePanel";
import menu from "@/constants/app_menu_constant";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const getNestedItemStyles = (isActive: boolean, level?: number) => ({
  pl: level ? 4 * level : 2,

  bgcolor: isActive ? "primary.main" : "inherit",
  color: isActive ? "white" : "inherit",
  borderRight: isActive ? "4px solid" : "none",
  borderRightColor: isActive ? "secondary.main" : "inherit",
  borderTopRightRadius: isActive ? "8px" : "0",
  borderBottomRightRadius: isActive ? "8px" : "0",
  transition: "all 0.3s ease",
  "&:hover": {
    bgcolor: isActive ? "primary.main" : "action.hover",
  },
});

const Sidebar = ({ container }: { container?: () => HTMLElement }) => {
  const dispatch = useRootDispatch();
  const { desktopOpen, mobileOpen, nestedOpen } = useRootSelector(
    (state) => state.sidebar
  );
  const { brandName } = usePanel();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const handleDrawerTransitionEnd = () => {
    dispatch(transitionEnd());
  };

  const handleClick = (item: any) => {
    if (item.route) {
      navigate(item.route);
    } else {
      dispatch(toggleNestedOpen(item.text));
    }
  };

  const handleNestedClick = (key: string, route?: string) => {
    if (route) {
      navigate(route);
    } else {
      dispatch(toggleNestedOpen(key));
    }
  };

  const renderNestedItems = (items: any, level = 1) => (
    <List component="div" disablePadding>
      {items.map((nestedItem: any, nestedIndex: number) => (
        <div key={nestedIndex}>
          <ListItemButton
            sx={getNestedItemStyles(
              location.pathname === nestedItem.route,
              level
            )}
            onClick={() =>
              nestedItem.route
                ? handleNestedClick(nestedItem.text, nestedItem.route)
                : handleNestedClick(nestedItem.text)
            }
            // selected={location.pathname === nestedItem.route}
          >
            <ListItemIcon
              sx={{
                color:
                  location.pathname === nestedItem.route ? "white" : "inherit",
              }}
            >
              {nestedItem.icon}
            </ListItemIcon>
            <ListItemText primary={nestedItem.text} />
            {nestedItem.nestedItems &&
              (nestedOpen[nestedItem.text] ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          {nestedItem.nestedItems && (
            <Collapse
              in={nestedOpen[nestedItem.text]}
              timeout="auto"
              unmountOnExit
            >
              {renderNestedItems(nestedItem.nestedItems, level + 1)}
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );

  const drawer = (
    <div className="wd-h-[100vh] wd-overflow-hidden">
      <Toolbar
        sx={{
          height: 200,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src="https://via.placeholder.com/100"
          alt="Brand Logo"
          sx={{ height: "60px", width: "60px", marginRight: "10px" }}
        />
        <Typography variant="body1" noWrap>
          {brandName}
        </Typography>
      </Toolbar>
      <Divider />
      <List className="wd-overflow-y-auto wd-h-[calc(100vh-200px)] wd-flex-grow-1">
        {menu.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemButton
                sx={getNestedItemStyles(location.pathname === item.route)}
                onClick={() => handleClick(item)}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.route ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.nestedItems &&
                  (nestedOpen[item.text] ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.nestedItems && (
              <Collapse in={nestedOpen[item.text]} timeout="auto" unmountOnExit>
                {renderNestedItems(item.nestedItems)}
              </Collapse>
            )}
          </div>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth * 1.2, // Increase the width
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        sx={{
          display: { xs: "none", sm: "flex" },
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={desktopOpen}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
