import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { useNavigate } from "react-router-dom";
import TPSService from "../../services/TPSService";
import { TPSModel } from "../../types/TPSModel";
import TableTPSAction from "../../components/TableTPSAction";
import { formatDateString } from "@/utility/dateFormat";

const useListTPS = () => {
  const uniqKey = "tps";
  const testService = new TPSService();
  const navigate = useNavigate();
  const columns: ColumnType<TPSModel>[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    { field: "nomor", headerName: "Nomor" },
    { field: "alamat", headerName: "Alamat" },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      valueFormatter: (data: TPSModel) => {
        return formatDateString(data.createdDate);
      },
    },

    {
      field: "updatedDate",
      headerName: "Updated Date",
      type: "date",
      valueFormatter: (data: TPSModel) => {
        return formatDateString(data.updatedDate);
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: TPSModel) => {
        return <TableTPSAction data={data} />;
      },
    },
  ];
  const handleAddButtonClick = () => {
    navigate("/portal/tps/tambah");
  };

  const service = (postQuery: PostQuery) => {
    return testService.all(postQuery);
  };
  return {
    columns,
    testService,
    handleAddButtonClick,
    service,
    uniqKey,
  };
};

export default useListTPS;
