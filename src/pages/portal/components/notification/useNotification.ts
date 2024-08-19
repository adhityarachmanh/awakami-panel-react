import React from "react";

const useNotification = () => {
  const [notificationAnchorEl, setNotificationAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const open = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  return {
    open,
    notificationAnchorEl,
    handleNotificationClick,
    handleNotificationClose,
  };
};

export default useNotification;
