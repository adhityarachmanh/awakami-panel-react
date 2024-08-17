import React from 'react'
import { IconButton, Badge, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

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
}

export default Notification