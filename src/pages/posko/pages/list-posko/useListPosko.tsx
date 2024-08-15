import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { useNavigate } from "react-router-dom";
import PoskoService from "../../services/PoskoService";
import { PoskoModel } from "../../types/PoskoModel";
import { formatDateString } from "@/utility/dateFormat";
import TablePoskoAction from "../../components/TableTPSAction";

const useListPosko = () => {
  const uniqKey = "posko";
  const poskoService = new PoskoService();
  const navigate = useNavigate();
  const columns: ColumnType<PoskoModel>[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    { field: "nama", headerName: "Nama" },
    { field: "alamat", headerName: "Alamat" },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      valueFormatter: (data: PoskoModel) => {
        return formatDateString(data.createdDate);
      },
    },

    {
      field: "updatedDate",
      headerName: "Updated Date",
      type: "date",
      valueFormatter: (data: PoskoModel) => {
        return formatDateString(data.updatedDate);
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: PoskoModel) => {
        return <TablePoskoAction data={data} />;
      },
    },
  ];
  const handleAddButtonClick = () => {
    navigate("/portal/tps/tambah");
  };

  const service = (postQuery: PostQuery) => {
    return poskoService.all(postQuery);
  };
  return {
    columns,
    poskoService,
    handleAddButtonClick,
    service,
    uniqKey,
  };
};

export default useListPosko;
