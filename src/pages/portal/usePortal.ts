import { useSnackbar } from "@/hooks/useSnackbar";
import AuthService from "@/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { useRootDispatch, useRootSelector } from "@/stores";
import { authenticate, deauthenticate } from "@/stores/reducers/authReducer";

const usePortal = ({ window }: any) => {
  const authService = new AuthService();
  const { showSnackbar } = useSnackbar();
  const dispatch = useRootDispatch();
  const { desktopOpen } = useRootSelector((state) => state.sidebar);
  const { auth } = useRootSelector((state) => state.auth);
  const container =
  window !== undefined ? () => window().document.body : undefined;
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

  return { refreshTokenMutation, desktopOpen, auth, window, container };
};

export default usePortal;
