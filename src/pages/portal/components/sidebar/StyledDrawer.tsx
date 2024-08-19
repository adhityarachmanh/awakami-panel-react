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

export { drawerWidth, getNestedItemStyles };
