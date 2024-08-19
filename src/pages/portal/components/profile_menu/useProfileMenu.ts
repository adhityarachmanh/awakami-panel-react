import ProfileService from '@/pages/profile/services/ProfileService';
import { useRootDispatch } from '@/stores';
import { deauthenticate } from '@/stores/reducers/authReducer';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const useProfileMenu = () => {
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
  return {
      profileQuery,
    anchorEl,
    navigate,
    handleAvatarClick,
    handleMenuClose,
    logout,
  };
};

export default useProfileMenu