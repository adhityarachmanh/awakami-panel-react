import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BeritaService from "../../services/BeritaService";

const useDetailBerita = (id: number) => {
  const beritaService = new BeritaService();
  const navigate = useNavigate();
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["berita-detail", id],
    queryFn: () => beritaService.getDetail(id),
  });
  return {
    data,
    isLoading,
    navigate,
  };
};

export default useDetailBerita;
