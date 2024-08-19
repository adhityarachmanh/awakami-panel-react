import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  Toolbar,
  Typography,
} from "@mui/material";
import menu from "@/constants/app_menu_constant";
import { drawerWidth } from "./StyledDrawer";
import SidebarListItem from "./components/SidebarListItem";
import useSidebar from "./useSidebar";

const Sidebar = ({ container }: { container?: () => HTMLElement }) => {
  const {
    desktopOpen,
    mobileOpen,
    nestedOpen,
    brandName,
    location,
    handleClick,
    handleNestedClick,
    handleDrawerClose,
    handleDrawerTransitionEnd,
  } = useSidebar();

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
          <SidebarListItem
            key={index}
            item={item}
            location={location}
            nestedOpen={nestedOpen}
            handleClick={handleClick}
            handleNestedClick={handleNestedClick}
          />
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
