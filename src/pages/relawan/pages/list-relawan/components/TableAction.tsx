import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { RelawanModel } from "@/pages/relawan/types/RelawanModel";
import { Button } from "@mui/material";

interface TableActionProps {
  data: RelawanModel;
  handleEditButtonClick: (data: RelawanModel) => void;
}

const TableAction = ({ data, handleEditButtonClick }: TableActionProps) => {
  const { showConfirmationDialog } = useConfirmationDialog();
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <Button
        variant="contained"
        color="warning"
        fullWidth
        onClick={() => handleEditButtonClick(data)}
      >
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
};

export default TableAction;
