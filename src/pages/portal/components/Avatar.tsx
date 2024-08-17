import React from "react";
import { Menu, Box, Avatar, Divider, MenuItem, IconButton } from "@mui/material";
import UserService from "@/services/UserService";
import { deauthenticate } from "@/stores/reducers/authReducer";
import { useQuery } from "@tanstack/react-query";
import { useRootDispatch } from "@/stores";

const AvatarComponent = () => {
    
  const profileService = new UserService();
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
  const user = React.useMemo(
    () => profileQuery.data?.data,
    [profileQuery.data?.data]
  );

  const stringAvatar = React.useMemo(() => {
    if (!user?.name) return {};
    return {
      alt: "User Avatar",
      src: user.imagePath
        ? `${import.meta.env.VITE_API_URL}/${user.imagePath}`
        : undefined,
      children: user.imagePath ? undefined : (
        <span className="wd-text-base wd-font-medium ">
          {`${user.name.split(" ")[0][0]}${user.name.split(" ")[1][0]}`}
        </span>
      ),
    };
  }, [user?.name, user?.imagePath]);


  return (
    <>
      <IconButton onClick={handleAvatarClick} color="inherit">
            <Avatar {...stringAvatar} />
          </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
          <Avatar {...stringAvatar} />

          <Box
            sx={{
              ml: 2,
            }}
          >
            <p className="wd-text-base wd-font-medium">{user?.name ?? "-"}</p>

            <p className="wd-text-sm wd-text-gray-500">{user?.email ?? "-"}</p>
          </Box>
        </Box>

        <Divider />

        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>

        <MenuItem onClick={handleMenuClose}>My account</MenuItem>

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

export default AvatarComponent;
