import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import BeritaService from "../../services/BeritaService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation } from "@tanstack/react-query";
import { BeritaFormModel } from "../../models/BeritaModel";

const useTambahBerita = () => {
  const beritaService = new BeritaService();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object().shape({
    Judul: Yup.string().required("Judul is required"),
    Deskripsi: Yup.string().required("Deskripsi is required"),
    Tanggal: Yup.string().required("Tanggal is required"),
    ImageFile: Yup.mixed().nullable().required("ImageFile is required"),
  });

  const mutation = useMutation({
    mutationFn: (data: BeritaFormModel) => beritaService.create(data),
    onSuccess: () => {
      showSnackbar("Berita berhasil ditambahkan", "success");
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

export default useTambahBerita;
