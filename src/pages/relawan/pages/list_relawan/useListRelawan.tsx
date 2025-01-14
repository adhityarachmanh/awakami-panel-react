import RelawanService from "../../services/RelawanService";
// import { useQueryClient } from "@tanstack/react-query";
import { RelawanModel } from "../../types/RelawanModel";
import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { useNavigate } from "react-router-dom";
import TableRelawanAction from "../../components/TableRelawanAction";
import { formatDateString } from "@/utility/dateFormat";

const useListRelawan = () => {
  const uniqKey = "relawan";
  const testService = new RelawanService();
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const columns: ColumnType<RelawanModel>[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    { field: "nama", headerName: "Nama" },
    { field: "noKTP", headerName: "No KTP" },
    { field: "jabatan", headerName: "Jabatan" },
    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      valueFormatter: (data: RelawanModel) => {
        return formatDateString(data.createdDate);
      },
    },

    {
      field: "updatedDate",

      headerName: "Updated Date",
      type: "date",

      valueFormatter: (data: RelawanModel) => {
        return formatDateString(data.updatedDate);
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: RelawanModel) => {
        return <TableRelawanAction data={data} />;
      },
    },
  ];
  const handleAddButtonClick = () => {
    navigate("/portal/relawan/tambah");
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

export default useListRelawan;
