import { useNavigate } from "react-router-dom";
import BeritaService from "../../services/BeritaService";
import { BeritaModel } from "../../models/BeritaModel";
import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { formatDateString } from "@/utility/dateFormat";
import TableBeritaAction from "../../components/TableBeritaAction";
import ImagePreview from "@/components/media/ImagePreview"; 

const useListBerita = () => {
  const uniqKey = "berita";
  const beritaService = new BeritaService();
  const navigate = useNavigate();
  const columns: ColumnType<BeritaModel>[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    {
      field: "filePath",
      headerName: "Image",
      renderCell: (data: BeritaModel) => {
        return (
          <ImagePreview
            imageStyle={{ width: "120px", height: "120px" }}
            src={`${import.meta.env.VITE_BASE_URL}/${data.filePath}`}
            alt="berita"
          />
        );
      },
    },
    { field: "judul", headerName: "Judul" },
    {
      field: "tanggal",
      headerName: "Tanggal",
      valueFormatter: (data: BeritaModel) => {
        return formatDateString(data.tanggal);
      },
    },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      valueFormatter: (data: BeritaModel) => {
        return formatDateString(data.createdDate);
      },
    },

    {
      field: "updatedDate",
      headerName: "Updated Date",
      type: "date",
      valueFormatter: (data: BeritaModel) => {
        return formatDateString(data.updatedDate);
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: BeritaModel) => {
        return <TableBeritaAction data={data} />;
      },
    },
  ];
  const handleAddButtonClick = () => {
    navigate("/portal/berita/tambah");
  };

  const service = (postQuery: PostQuery) => {
    return beritaService.all(postQuery);
  };
  return {
    columns,
    beritaService,
    handleAddButtonClick,
    service,
    uniqKey,
  };
};

export default useListBerita;
