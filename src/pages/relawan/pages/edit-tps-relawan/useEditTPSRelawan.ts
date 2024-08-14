import * as Yup from "yup";
import { TPSRelawanFormModel } from "../../types/TPSRelawanModel";
import RelawanService from "../../services/RelawanService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useEditTPSRelawan = (id: number, relawanId: number) => {
  const tpsService = new RelawanService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    tpsId: Yup.number().required("TPS is required"),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSRelawanFormModel) =>
      tpsService.updateTPSRelawan(id, data),
    onSuccess: () => {
      showSnackbar("TPS Relawan berhasil diubah", "success");
      navigate(`/portal/relawan/detail/${relawanId}`);
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

export default useEditTPSRelawan;
