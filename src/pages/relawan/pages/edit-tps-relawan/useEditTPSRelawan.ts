import * as Yup from "yup";
import { TPSRelawanFormModel } from "../../types/TPSRelawanModel";
import RelawanService from "../../services/RelawanService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useEditTPSRelawan = (id: number) => {
  const tpsService = new RelawanService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    tpsId: Yup.number().required("TPS is required"),
  });
  const tpsQuery = useQuery({
    queryKey: ["tps-relawan", id],
    queryFn: () => tpsService.getTPSRelawanById(id),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSRelawanFormModel) =>
      tpsService.updateTPSRelawan(id, data),
    onSuccess: (data) => {
      console.log(data);
      showSnackbar("TPS Relawan berhasil diubah", "success");
      navigate(`/portal/relawan/detail/${data.relawanId}`);
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
  };
};

export default useEditTPSRelawan;
