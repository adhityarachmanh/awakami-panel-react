import { useNavigate } from "react-router-dom";
import TPSService from "../../services/TPSService";
import { useQuery } from "@tanstack/react-query";

const useDetailTPS = (id: number) => {
  const navigate = useNavigate();
  const tpsService = new TPSService();
  const tpsQuery = useQuery({
    queryKey: ["tps-detail", id],
    queryFn: () => tpsService.getDetail(id),
  });

  return {
    tpsQuery,
    navigate,
  };
};

export default useDetailTPS;
