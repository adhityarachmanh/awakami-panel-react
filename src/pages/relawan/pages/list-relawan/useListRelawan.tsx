import { Button } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import RelawanService from "../../services/RelawanService";
import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { useDialog } from "@/hooks/useDialog";

const useListRelawan = () => {
  const testService = new RelawanService();
  const { showConfirmationDialog } = useConfirmationDialog();
  const { showDialog } = useDialog();
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100, type: "number" },
    { field: "nama", headerName: "Nama", flex: 1 },
    { field: "noKTP", headerName: "No KTP", flex: 1 },
    { field: "jabatan", headerName: "Jabatan", flex: 1 },

    {
      field: "createdDate",
      headerName: "Created Date",
      type: "date",
      flex: 1,
      valueFormatter: (params: any) => {
        const formattedDate = moment(params).format("DD/MM/YYYY");
        return formattedDate;
      },
    },

    {
      field: "updatedDate",

      headerName: "Updated Date",
      type: "date",

      flex: 1,
      valueFormatter: (params: any) => {
        const formattedDate = moment(params).format("DD/MM/YYYY");
        return formattedDate;
      },
    },

    {
      field: "action",
      type: "actions",
      headerName: "Action",
      cellClassName: "wd-flex wd-flex-row wd-items-center",
      flex: 1,
      renderCell: (params: any) => {
        return (
          <div className="wd-flex wd-flex-row wd-gap-2 ">
            <Button variant="contained" color="warning" onClick={() => {}}>
              <span className="wd-font-sans   wd-text-white">Edit</span>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => {
                showConfirmationDialog(
                  "Apakah Anda yakin ingin menghapus item ini?",
                  "Apakah Anda yakin ingin menghapus relawan ini? Tindakan ini tidak dapat dibatalkan.",

                  () => {
                    console.log("delete button clicked");
                  },
                  () => {
                    console.log("cancel button clicked");
                  },
                  {
                    acceptLabel: "Ya, Hapus",
                    acceptColor: "secondary",
                    rejectLabel: "Tidak, Batal",
                    rejectColor: "primary",
                  }
                );
              }}
            >
              {" "}
              <span className="wd-font-sans   wd-text-white">Delete</span>
            </Button>
          </div>
        );
      },
    },
  ];
  const handleAddButtonClick = () => {
    showDialog("Add Relawan", (close) => (
      <div className="wd-flex wd-flex-col wd-gap-2 wd-w-[500px]">
        <p>Content Relawan</p>
        <Button onClick={close}>Close</Button>
      </div>
    ));
  };
  return {
    columns,
    testService,
    handleAddButtonClick,
  };
};

export default useListRelawan;
