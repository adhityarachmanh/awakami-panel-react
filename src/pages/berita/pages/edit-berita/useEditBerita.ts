import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { BeritaFormModel } from "../../models/BeritaModel";
import BeritaService from "../../services/BeritaService";

const useEditBerita = (id: number) => {
  const beritaService = new BeritaService();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object().shape({
    Judul: Yup.string().required("Judul is required"),
    Deskripsi: Yup.string().required("Deskripsi is required"),
    Tanggal: Yup.string().required("Tanggal is required"),
    ImageFile: Yup.mixed().nullable(),
  });
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["berita-detail", id],
    queryFn: () => beritaService.getDetail(id),
  });
  const mutation = useMutation({
    mutationFn: (data: BeritaFormModel) => beritaService.update(id, data),
    onSuccess: () => {
      showSnackbar("Berita berhasil ditambahkan", "success");
      navigate("/portal/berita");
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return {
    mutation,
    navigate,
    validationSchema,
    data,
    isLoading,
  };
};

export default useEditBerita;
