import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import RelawanService from "../../services/RelawanService";
import { useMutation } from "@tanstack/react-query";
import { RelawanFormModel } from "../../types/RelawanModel";
import { useSnackbar } from "@/hooks/useSnackbar";
import PoskoService from "@/pages/posko/services/PoskoService";
import WilayahService from "@/services/WilayahService";

const useTambahRelawan = () => {
  const wilayahService = new WilayahService();
  const poskoService = new PoskoService();
  const relawanService = new RelawanService();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    nama: Yup.string().required("Nama is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
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

  const mutation = useMutation({
    mutationFn: (data: RelawanFormModel) => relawanService.create(data),
    onSuccess: () => {
      showSnackbar("Relawan berhasil ditambahkan", "success");
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
    poskoService,
    wilayahService,
  };
};

export default useTambahRelawan;
