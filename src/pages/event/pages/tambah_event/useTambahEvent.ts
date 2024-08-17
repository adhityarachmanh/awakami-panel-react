import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation } from "@tanstack/react-query";
import { EventFormModel } from "../../models/EventModel";

const useTambahEvent = () => {
  const eventService = new EventService();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object().shape({
    Judul: Yup.string().required("Judul is required"),
    Deskripsi: Yup.string().required("Deskripsi is required"),
    Tanggal: Yup.string().required("Tanggal is required"),
    Jam: Yup.string().required("Jam is required"),
    ImageFile: Yup.mixed().nullable().required("ImageFile is required"),
  });
  
  const mutation = useMutation({
    mutationFn: (data: EventFormModel) => eventService.create(data),
    onSuccess: () => {
      showSnackbar("Event berhasil ditambahkan", "success");
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

export default useTambahEvent;
