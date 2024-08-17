import * as Yup from "yup";
import PoskoService from "../../services/PoskoService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { PoskoFormModel } from "../../types/PoskoModel";

const useTambahPosko = () => {
  const poskoService = new PoskoService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    nomor: Yup.string().required("Nomor is required"),
    alamat: Yup.string().required("Alamat is required"),
  });
  const mutation = useMutation({
    mutationFn: (data: PoskoFormModel) => poskoService.create(data),
    onSuccess: () => {
      showSnackbar("Posko berhasil ditambahkan", "success");
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

export default useTambahPosko;
