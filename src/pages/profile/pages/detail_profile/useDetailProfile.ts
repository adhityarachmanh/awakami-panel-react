import { useNavigate } from "react-router-dom";
import ProfileService from "../../services/ProfileService";
import { useQuery } from "@tanstack/react-query";

const useDetailProfile = () => {
  const profileService = new ProfileService();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["profile"],
    queryFn: () => profileService.getProfile(),
  });

  return { query, navigate };
};

export default useDetailProfile;
