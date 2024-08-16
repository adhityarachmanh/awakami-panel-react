import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";

import {
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import BeritaService from "../services/BeritaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { BeritaModel } from "../models/BeritaModel";

interface TableBeritaActionProps {
  data: BeritaModel;
}

const TableBeritaAction = ({ data }: TableBeritaActionProps) => {
  const queryClient = useQueryClient();
  const { showConfirmationDialog } = useConfirmationDialog();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const beritaService = new BeritaService();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => {
      return beritaService.delete(ids);
    },
    onSuccess: () => {
      showSnackbar("Berita berhasil dihapus", "success");
      queryClient.invalidateQueries({ queryKey: ["berita"] });
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <IconButton
        color="primary"
        onClick={() => navigate(`/portal/berita/detail/${data.id}`)}
      >
        <VisibilityOutlined />
      </IconButton>
      <IconButton
        color="warning"
        onClick={() => navigate(`/portal/berita/edit/${data.id}`)}
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => {
          showConfirmationDialog(
            "Apakah Anda yakin ingin menghapus berita ini?",
            "Apakah Anda yakin ingin menghapus berita ini? Tindakan ini tidak dapat dibatalkan.",

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

export default TableBeritaAction;
