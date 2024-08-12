import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import { useRootSelector } from "stores";
import StyledMain from "./components/StyledMain";
import usePanel from "./usePanel";
import { useEffect } from "react";

interface Props {
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const { desktopOpen } = useRootSelector((state) => state.sidebar);
  const { auth } = useRootSelector((state) => state.auth);
  const { refreshTokenMutation } = usePanel();

  useEffect(() => {
    if (auth !== null) {
      const initialDelay = setTimeout(() => {
        refreshTokenMutation.mutate();
      }, 3000);

      return () => {
        clearTimeout(initialDelay);
      };
    }
  }, []);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar />
      <Sidebar container={container} />
      <StyledMain open={desktopOpen}>
        <Toolbar />
        <Outlet />
      </StyledMain>
    </Box>
  );
}
