import * as Yup from "yup";
import { TPSRelawanFormModel } from "../../types/TPSRelawanModel";
import RelawanService from "../../services/RelawanService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TPSService from "@/pages/tps/services/TPSService";

const useEditTPSRelawan = (id: number) => {
  const relawanService = new RelawanService();
  const tpsService = new TPSService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    tpsId: Yup.number().required("TPS is required"),
  });
  const tpsQuery = useQuery({
    queryKey: ["tps-relawan", id],
    queryFn: () => relawanService.getTPSRelawanById(id),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSRelawanFormModel) =>
      relawanService.updateTPSRelawan(id, data),
    onSuccess: (data) => {
      console.log(data);
      showSnackbar("TPS Relawan berhasil diubah", "success");
      navigate(-1);
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return {
    mutation,
    tpsQuery,
    navigate,
    validationSchema,
    tpsService,
  };
};

export default useEditTPSRelawan;
