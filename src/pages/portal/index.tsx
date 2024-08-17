import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import AppBar from "./components/AppBar";
import Sidebar from "./components/Sidebar";
import { Box, Toolbar } from "@mui/material";
import { useRootSelector } from "@/stores";
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
      }, 5000);

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
      <div className="wd-fixed wd-bg-y-50 -wd-z-50 wd-w-full wd-top-0 wd-bg-content wd-bg-layout-header wd-min-h-[18.75rem]">
          <span className="wd-absolute wd-top-0 wd-left-0 wd-w-full wd-h-full wd-bg-blue-500 wd-opacity-60"></span>
        </div>
        <Toolbar />
        <Outlet />
       
      </StyledMain>
    </Box>
  );
}
