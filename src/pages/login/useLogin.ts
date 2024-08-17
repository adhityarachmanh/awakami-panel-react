import { useSnackbar } from "@/hooks/useSnackbar";
import AuthService from "@/services/AuthService";
import { LoginRequest } from "@/types/AuthModel";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useRootDispatch } from "@/stores";
import { authenticate } from "@/stores/reducers/authReducer";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

const useLogin = () => {
  const authService = new AuthService();
  const { t } = useTranslation("login");
  const dispatch = useRootDispatch();
  const { showSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const brandName = import.meta.env.VITE_BRAND_NAME;
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: async (request: LoginRequest) => {
      const response = await authService.login(request);
      return response;
    },
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      dispatch(authenticate(data.data));
    },
    onError: () => {
      showSnackbar("Login failed", "error");
    },
  });
  return {
    t,
    showPassword,
    mutation,
    validationSchema,
    brandName,
    setShowPassword,
  };
};
export default useLogin;
