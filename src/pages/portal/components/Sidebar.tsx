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
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { useState } from "react";

import { useRootDispatch, useRootSelector } from "stores";
import { closeDrawer, transitionEnd } from "stores/reducers/sidebarReducer";
import usePanel from "../usePanel";
import menu from "@/constants/menu_constant";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ container }: { container?: () => HTMLElement }) => {
  const dispatch = useRootDispatch();
  const { desktopOpen, mobileOpen } = useRootSelector((state) => state.sidebar);
  const { brandName } = usePanel();
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [nestedOpen, setNestedOpen] = useState<{ [key: string]: boolean }>({});

  const handleDrawerClose = () => {
    dispatch(closeDrawer());
  };

  const handleDrawerTransitionEnd = () => {
    dispatch(transitionEnd());
  };

  const handleClick = (item: any) => {
    if (item.nestedItems) {
      setOpen(!open);
      setNestedOpen((prev) => ({ ...prev, [item.text]: !prev[item.text] }));
    } else if (item.route) {
      navigate(item.route);
    }
  };

  const handleNestedClick = (key: string) => {
    setNestedOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderNestedItems = (items: any, level = 1) => (
    <List component="div" disablePadding>
      {items.map((nestedItem: any, nestedIndex: number) => (
        <div key={nestedIndex}>
          <ListItemButton
            sx={{ pl: 4 * level }}
            onClick={() =>
              nestedItem.nestedItems && handleNestedClick(nestedItem.text)
            }
          >
            <ListItemIcon>{nestedItem.icon}</ListItemIcon>
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
    <div>
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
        <div className="text-body-1 whitespace-nowrap">{brandName}</div>
      </Toolbar>
      <Divider />
      <List>
        {menu.map((item, index) => (
          <div key={index}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleClick(item)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.nestedItems && (open ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {item.nestedItems && (
              <Collapse in={open} timeout="auto" unmountOnExit>
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
            width: drawerWidth,
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
