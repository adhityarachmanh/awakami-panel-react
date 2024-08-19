import React from "react";
import { Menu, Box, Divider, MenuItem, IconButton } from "@mui/material";
import ProfileAvatar from "@/components/profile_avatar";
import useProfileMenu from "./useProfileMenu";

const ProfileMenu = () => {
  const {
    profileQuery,
    anchorEl,
    navigate,
    handleAvatarClick,
    handleMenuClose,
    logout,
  } = useProfileMenu();
  const profile = React.useMemo(
    () => profileQuery.data?.data,
    [profileQuery.data?.data]
  );

  return (
    <>
      <IconButton onClick={handleAvatarClick} color="inherit">
        <ProfileAvatar />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <ProfileAvatar />

          <Box
            sx={{
              ml: 2,
            }}
          >
            <p className="wd-text-base wd-font-medium">
              {profile?.name ?? "-"}
            </p>

            <p className="wd-text-sm wd-text-gray-500">
              {profile?.email ?? "-"}
            </p>
          </Box>
        </Box>

        <Divider />

        <MenuItem
          onClick={() => {
            handleMenuClose();
            navigate("/portal/profile");
          }}
        >
          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            logout();
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
