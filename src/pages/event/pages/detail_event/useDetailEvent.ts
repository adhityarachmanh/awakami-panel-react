import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";

const useDetailEvent = (id: number) => {
  const eventService = new EventService();
  const navigate = useNavigate();
  const { data, isFetching: isLoading } = useQuery({
    queryKey: ["event-detail", id],
    queryFn: () => eventService.getDetail(id),
  });
  return {
    data,
    isLoading,
    navigate,
  };
};

export default useDetailEvent;
