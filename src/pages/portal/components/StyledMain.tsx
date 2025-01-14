import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const StyledMain = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1, 
  position: "relative",
  height: "100vh",
  overflowY: "auto", // Enable vertical scrolling
  // padding: theme.spacing(3),

  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down("sm")]: {
    width: `100%`,
    marginLeft: 0,
  },
}));

export default StyledMain;