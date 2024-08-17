import { useSnackbar } from "@/hooks/useSnackbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { EventFormModel } from "../../models/EventModel";
import EventService from "../../services/EventService";

const useEditEvent = (id: number) => {
  const eventService = new EventService();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();
  const validationSchema = Yup.object().shape({
    Judul: Yup.string().required("Judul is required"),
    Deskripsi: Yup.string().required("Deskripsi is required"),
    Tanggal: Yup.string().required("Tanggal is required"),
    Jam: Yup.string().required("Jam is required"),
    ImageFile: Yup.mixed().nullable(),
  });
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["event-detail", id],
    queryFn: () => eventService.getDetail(id),
  });
  const mutation = useMutation({
    mutationFn: (data: EventFormModel) => eventService.update(id, data),
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
    data,
    isLoading,
  };
};

export default useEditEvent;
