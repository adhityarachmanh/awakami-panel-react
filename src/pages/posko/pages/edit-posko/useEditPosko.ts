import * as Yup from "yup";
import PoskoService from "../../services/PoskoService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PoskoFormModel } from "../../types/PoskoModel";

const useEditPosko = (id: number) => {
  const poskoService = new PoskoService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama is required"),
    alamat: Yup.string().required("Alamat is required"),
  });
  const poskoQuery = useQuery({
    queryKey: ["posko-detail", id],
    queryFn: () => poskoService.getDetail(id),
  });
  const mutation = useMutation({
    mutationFn: (data: PoskoFormModel) => poskoService.update(id, data),
    onSuccess: () => {
      showSnackbar("Posko berhasil ditambahkan", "success");
      navigate("/portal/posko");
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return {
    mutation,
    poskoQuery,
    navigate,
    validationSchema,
  };
};

export default useEditPosko;
