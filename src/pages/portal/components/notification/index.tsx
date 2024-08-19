import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useNotification from "./useNotification";

const Notification = () => {
  const {
    open,
    notificationAnchorEl,
    handleNotificationClick,
    handleNotificationClose,
  } = useNotification();
  return (
    <>
      <IconButton
        color="inherit"
        aria-controls={open ? "notification-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleNotificationClick}
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Menu
        id="notification-menu"
        anchorEl={notificationAnchorEl}
        open={open}
        onClose={handleNotificationClose}
      >
        <MenuItem onClick={handleNotificationClose}>Notification 1</MenuItem>
        <MenuItem onClick={handleNotificationClose}>Notification 2</MenuItem>
        <MenuItem onClick={handleNotificationClose}>Notification 3</MenuItem>
        <MenuItem onClick={handleNotificationClose}>Notification 4</MenuItem>
      </Menu>
    </>
  );
};

export default Notification;
