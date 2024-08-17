import ProfileService from "@/pages/profile/services/ProfileService";
import { Avatar, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface ProfileAvatarProps {
  style?: React.CSSProperties;
  fontSize?: number;
}

const ProfileAvatar = ({ style, fontSize = 16 }: ProfileAvatarProps) => {
  const profileService = new ProfileService();
  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
  });
  const profile = React.useMemo(
    () => profileQuery.data?.data,
    [profileQuery.data?.data]
  );

  const stringAvatar = React.useMemo(() => {
    if (!profile?.name) return {};
    return {
      alt: "User Avatar",
      src: profile.imagePath
        ? `${import.meta.env.VITE_BASE_URL}/${profile.imagePath}`
        : undefined,
      children: profile.imagePath ? undefined : (
        <Typography fontSize={fontSize} fontWeight="medium">
          {`${profile.name.split(" ")[0][0]}${profile.name.split(" ")[1][0]}`}
        </Typography>
      ),
    };
  }, [profile?.name, profile?.imagePath]);
  return <Avatar {...stringAvatar} style={style} />;
};

export default ProfileAvatar;
