import * as Yup from "yup";
import TPSService from "../../services/TPSService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TPSFormModel } from "../../types/TPSModel";

const useEditTPS = (id: number) => {
  const tpsService = new TPSService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    nomor: Yup.string().required("Nomor is required"),
    alamat: Yup.string().required("Alamat is required"),
  });
  const tpsQuery = useQuery({
    queryKey: ["tps-detail", id],
    queryFn: () => tpsService.getDetail(id),
  });
  const mutation = useMutation({
    mutationFn: (data: TPSFormModel) => tpsService.update(id, data),
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
    tpsQuery,
    navigate,
    validationSchema,
  };
};

export default useEditTPS;
