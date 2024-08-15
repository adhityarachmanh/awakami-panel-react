import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { useSnackbar } from "@/hooks/useSnackbar";
import { VisibilityOutlined, EditOutlined, DeleteOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import TPSService from "../services/TPSService";
import { TPSModel } from "../types/TPSModel";

interface TableTPSActionProps {
  data: TPSModel;
}

const TableTPSAction = ({ data }: TableTPSActionProps) => {
    const { showConfirmationDialog } = useConfirmationDialog();
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const tpsService = new TPSService();
    const mutation = useMutation({
      mutationFn: (ids: string[]) => {
        return tpsService.delete(ids);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tps"] });
        showSnackbar("TPS berhasil dihapus", "success");
      },
      onError: (error) => {
        showSnackbar(error.message, "error");
      },
    });
    return (
      <div className="wd-flex wd-flex-row wd-gap-2 ">
        <IconButton
          color="primary"
          onClick={() => navigate(`/portal/tps/${data.id}`)}
        >
          <VisibilityOutlined />
        </IconButton>
        <IconButton
          color="warning"
          onClick={() => navigate(`/portal/tps/edit/${data.id}`)}
        >
          <EditOutlined />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => {
            showConfirmationDialog(
              "Apakah Anda yakin ingin menghapus TPS ini?",
              "Apakah Anda yakin ingin menghapus TPS ini? Tindakan ini tidak dapat dibatalkan.",
  
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

export default TableTPSAction;