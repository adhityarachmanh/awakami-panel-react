import * as Yup from "yup";
import RelawanService from "../../services/RelawanService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { RelawanEditFormModel } from "../../types/RelawanModel";

const useEditRelawan = (id: number) => {
  const relawanService = new RelawanService();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationEditSchema = Yup.object().shape({
    nama: Yup.string().required("Nama is required"),

    noKTP: Yup.string()
      .matches(/^\d{16}$/, "No KTP must be exactly 16 digits")
      .required("No KTP is required"),
    jenisKelamin: Yup.string().required("Jenis Kelamin is required"),
    jabatan: Yup.string().required("Jabatan is required"),
    jabatanPosko: Yup.string().required("Jabatan Posko is required"),
    poskoId: Yup.number().nullable().required("Posko is required"),
    provinsiId: Yup.number().nullable().required("Provinsi is required"),
    kotaId: Yup.number().nullable().required("Kota is required"),
    kecamatanId: Yup.number().nullable().required("Kecamatan is required"),
    kelurahanId: Yup.number().nullable().required("Kelurahan is required"),
    alamat: Yup.string().required("Alamat is required"),
  });

  const {
    data,
    isFetching: isLoading,
    error,
  } = useQuery({
    queryKey: ["relawan-detail", id],
    queryFn: () => relawanService.getDetail(id),
  });
  const mutation = useMutation({
    mutationFn: (data: RelawanEditFormModel) => relawanService.update(id, data),
    onSuccess: () => {
      showSnackbar("Relawan berhasil diubah", "success");
      navigate("/portal/relawan");
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return { isLoading, validationEditSchema, data, mutation, navigate };
};

export default useEditRelawan;