import * as Yup from "yup";
import { TPSRelawanFormModel } from "../../types/TPSRelawanModel";
import RelawanService from "../../services/RelawanService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TPSService from "@/pages/tps/services/TPSService";

const useTambahTPSRelawan = () => {
  const relawanService = new RelawanService();
  const tpsService = new TPSService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    tpsId: Yup.number().required("TPS is required"),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSRelawanFormModel) =>
      relawanService.createTPSRelawan(data),
    onSuccess: () => {
      showSnackbar("TPS Relawan berhasil ditambahkan", "success");
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
    tpsService
  };
};

export default useTambahTPSRelawan;
