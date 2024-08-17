import { useNavigate } from "react-router-dom";
import PoskoService from "../../services/PoskoService";
import { useQuery } from "@tanstack/react-query";

const useDetailPosko = (id: number) => {
  const navigate = useNavigate();
  const poskoService = new PoskoService();
  const poskoQuery = useQuery({
    queryKey: ["posko-detail", id],
    queryFn: () => poskoService.getDetail(id),
  });

  return {
    poskoQuery,
    navigate,
  };
};

export default useDetailPosko;
