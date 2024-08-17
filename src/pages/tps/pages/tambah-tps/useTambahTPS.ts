import * as Yup from "yup";
import TPSService from "../../services/TPSService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { TPSFormModel } from "../../types/TPSModel";

const useTambahTPS = () => {
  const tpsService = new TPSService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    nomor: Yup.string().required("Nomor is required"),
    alamat: Yup.string().required("Alamat is required"),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSFormModel) => tpsService.create(data),
    onSuccess: () => {
      showSnackbar("TPS berhasil ditambahkan", "success");
      navigate(-1);
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return {
    mutation,
    navigate,
    validationSchema,
  };
};

export default useTambahTPS;
