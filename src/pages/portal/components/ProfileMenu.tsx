import React from "react";
import { Menu, Box, Divider, MenuItem, IconButton } from "@mui/material";
import { deauthenticate } from "@/stores/reducers/authReducer";
import { useQuery } from "@tanstack/react-query";
import { useRootDispatch } from "@/stores";
import { useNavigate } from "react-router-dom";
import ProfileService from "@/pages/profile/services/ProfileService";
import ProfileAvatar from "@/components/profile_avatar";

const ProfileMenu = () => {
  const profileService = new ProfileService();
  const navigate = useNavigate();
  const dispatch = useRootDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
  });

  const logout = () => {
    dispatch(deauthenticate());
  };
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
