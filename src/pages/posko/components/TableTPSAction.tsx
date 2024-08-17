import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import {
  VisibilityOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { PoskoModel } from "../types/PoskoModel";
import PoskoService from "../services/PoskoService";

interface TablePoskoActionProps {
  data: PoskoModel;
}

const TablePoskoAction = ({ data }: TablePoskoActionProps) => {
  const { showConfirmationDialog } = useConfirmationDialog();
  const queryClient = useQueryClient();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const poskoService = new PoskoService();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => {
      return poskoService.delete(ids);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posko"] });
      showSnackbar("Posko berhasil dihapus", "success");
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <IconButton
        color="primary"
        onClick={() => navigate(`/portal/posko/detail/${data.id}`)}
      >
        <VisibilityOutlined />
      </IconButton>
      <IconButton
        color="warning"
        onClick={() => navigate(`/portal/posko/edit/${data.id}`)}
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => {
          showConfirmationDialog(
            "Apakah Anda yakin ingin menghapus posko ini?",
            "Apakah Anda yakin ingin menghapus posko ini? Tindakan ini tidak dapat dibatalkan.",

            () => {
              mutation.mutate([data.id.toString()]);
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
        <DeleteOutlined />
      </IconButton>
    </div>
  );
};

export default TablePoskoAction;
