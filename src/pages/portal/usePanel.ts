import { useSnackbar } from "@/hooks/useSnackbar";
import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useRootDispatch } from "@/stores";
import { authenticate, deauthenticate } from "@/stores/reducers/authReducer";

const usePanel = () => {
  const authService = new AuthService();
  const { showSnackbar } = useSnackbar();
  const dispatch = useRootDispatch();
  const brandName = import.meta.env.VITE_BRAND_NAME;
  const refreshTokenMutation = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async () => {
      const response = await authService.refreshToken();
      return response;
    },
    onSuccess: (data) => {
      showSnackbar("Token refreshed", "success");
      dispatch(authenticate(data));
    },
    onError: () => {
      showSnackbar("Token refresh failed", "error");
      dispatch(deauthenticate());
    },
  });

 

  return { refreshTokenMutation,  brandName };
};

export default usePanel;
