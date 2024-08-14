import { Button } from "@mui/material";
import moment from "moment";
import RelawanService from "../../services/RelawanService";
import { useDialog } from "@/hooks/useDialog";
// import { useQueryClient } from "@tanstack/react-query";
import TableAction from "./components/TableAction";
import { RelawanModel } from "../../types/RelawanModel";
import { ColumnType } from "@/components/table/types/ColumnModel";
import { PostQuery } from "@/types/PostQuery";
import { useNavigate } from "react-router-dom";

const useListRelawan = () => {
  const uniqKey = "relawan";
  const testService = new RelawanService();
  // const queryClient = useQueryClient();
  const { showDialog } = useDialog();
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
        const formattedDate = moment(data.createdDate).format("DD/MM/YYYY");
        return formattedDate;
      },
    },

    {
      field: "updatedDate",

      headerName: "Updated Date",
      type: "date",

      valueFormatter: (data: RelawanModel) => {
        const formattedDate = moment(data.updatedDate).format("DD/MM/YYYY");
        return formattedDate;
      },
    },
    {
      field: "action",
      type: "actions",
      headerName: "Action",
      renderCell: (data: RelawanModel) => {
        return (
          <TableAction
            handleEditButtonClick={handleEditButtonClick}
            data={data}
          />
        );
      },
    },
  ];
  const handleAddButtonClick = () => {
    // showDialog("Tambah Relawan", (close) => (
    //   <div className="wd-flex wd-flex-col wd-gap-2 wd-w-[500px]">
    //     <p>Content Relawan</p>
    //     <Button onClick={close}>Close</Button>
    //   </div>
    // ));
    navigate("/portal/relawan/tambah");
  };
  const handleEditButtonClick = (data: RelawanModel) => {
    navigate(`/portal/relawan/edit/${data.id}`);
    // showDialog("Edit Relawan", (close) => (
    //   <div className="wd-flex wd-flex-col wd-gap-2 wd-w-[500px]">
    //     <p>Content Relawan</p>
    //     <p>Nama : {data.nama}</p>
    //     <p>No KTP : {data.noKTP}</p>
    //     <p>Jabatan : {data.jabatan}</p>
    //     <Button onClick={close}>Close</Button>
    //   </div>
    // ));
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
