import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProfileService from "../../services/ProfileService";
import { ProfileFormModel } from "../../types/ProfileModel";
import { useSnackbar } from "@/hooks/useSnackbar";

const useEditProfile = () => {
    const profileService = new ProfileService();
    const queryClient = useQueryClient();
    const {showSnackbar} = useSnackbar();
    const validationSchema = Yup.object().shape({
        Name: Yup.string().required("name is required"),
        Email: Yup.string().email().required("email is required"),
        ImageFile: Yup.mixed().nullable(),
      });
    const navigate = useNavigate();
    const {data:query, isLoading} = useQuery({
      queryKey: ["profile"],
      queryFn: () => profileService.getProfile(),
    });
    const mutation = useMutation({
        mutationFn: (data: ProfileFormModel) => profileService.updateProfile(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          showSnackbar("Profile berhasil diubah", "success");
          navigate(-1);
        },
        onError: (error) => {
          showSnackbar(error.message, "error");
        },
      });
  
  return { query,isLoading, navigate, validationSchema, mutation };
};

export default useEditProfile;
