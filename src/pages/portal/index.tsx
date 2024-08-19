import CssBaseline from "@mui/material/CssBaseline";
import { Outlet } from "react-router-dom";
import AppBar from "./components/appbar";
import Sidebar from "./components/sidebar";
import { Box, Toolbar } from "@mui/material";
import StyledMain from "./components/StyledMain";
import { useEffect } from "react";
import usePortal from "./usePortal";

interface Props {
  window?: () => Window;
}

const Portal = ({ window }: Props) => {
  const { refreshTokenMutation, desktopOpen, auth, container } = usePortal({
    window,
  });

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
};

export default Portal;
