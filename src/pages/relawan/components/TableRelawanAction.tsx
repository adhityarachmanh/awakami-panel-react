import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { RelawanModel } from "@/pages/relawan/types/RelawanModel";
import {
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RelawanService from "../services/RelawanService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

interface TableRelawanActionProps {
  data: RelawanModel;
}

const TableRelawanAction = ({ data }: TableRelawanActionProps) => {
  const queryClient = useQueryClient();
  const { showConfirmationDialog } = useConfirmationDialog();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const relawanService = new RelawanService();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => {
      return relawanService.delete(ids);
    },
    onSuccess: () => {
      showSnackbar("Relawan berhasil dihapus", "success");
      queryClient.invalidateQueries({ queryKey: ["relawan"] });
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <IconButton
        color="primary"
        onClick={() => navigate(`/portal/relawan/detail/${data.id}`)}
      >
        <VisibilityOutlined />
      </IconButton>
      <IconButton
        color="warning"
        onClick={() => navigate(`/portal/relawan/edit/${data.id}`)}
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => {
          showConfirmationDialog(
            "Apakah Anda yakin ingin menghapus relawan ini?",
            "Apakah Anda yakin ingin menghapus relawan ini? Tindakan ini tidak dapat dibatalkan.",

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

export default TableRelawanAction;
