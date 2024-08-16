import { useNavigate } from "react-router-dom";
import EventService from "../../services/EventService";
import { EventModel } from "../../models/EventModel";
import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { formatDateString } from "@/utility/dateFormat";
import TableEventAction from "../../components/TableEventAction";
import ImagePreview from "@/components/image/ImagePreview";

const useListEvent = () => {
  const uniqKey = "event";
  const eventService = new EventService();
  const navigate = useNavigate();
  const columns: ColumnType<EventModel>[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    {
      field: "filePath",
      headerName: "Image",
      renderCell: (data: EventModel) => {
        return (
          <ImagePreview
            width="120px"
            height="120px"
            src={`${import.meta.env.VITE_BASE_URL}/${data.filePath}`}
            alt="event"
          />
        );
      },
    },
    { field: "judul", headerName: "Judul" },
    {
      field: "tanggal",
      headerName: "Tanggal",
      valueFormatter: (data: EventModel) => {
        return formatDateString(data.tanggal);
      },
    },
    { field: "jam", headerName: "Jam" },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      valueFormatter: (data: EventModel) => {
        return formatDateString(data.createdDate);
      },
    },

    {
      field: "updatedDate",
      headerName: "Updated Date",
      type: "date",
      valueFormatter: (data: EventModel) => {
        return formatDateString(data.updatedDate);
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: EventModel) => {
        return <TableEventAction data={data} />;
      },
    },
  ];
  const handleAddButtonClick = () => {
    navigate("/portal/event/tambah");
  };

  const service = (postQuery: PostQuery) => {
    return eventService.all(postQuery);
  };
  return {
    columns,
    eventService,
    handleAddButtonClick,
    service,
    uniqKey,
  };
};

export default useListEvent;
