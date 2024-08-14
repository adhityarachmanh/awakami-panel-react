import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import RelawanService from "../services/RelawanService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { TPSRelawanModel } from "../types/RelawanModel";

interface TableTPSRelawanActionProps {
  data: TPSRelawanModel;
}

const TableTPSRelawanAction = ({ data }: TableTPSRelawanActionProps) => {
  const queryClient = useQueryClient();
  const { showConfirmationDialog } = useConfirmationDialog();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const relawanService = new RelawanService();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => {
      return relawanService.deleteTPSRelawan(ids);
    },
    onSuccess: () => {
      showSnackbar("TPS Relawan berhasil dihapus", "success");
      queryClient.invalidateQueries({ queryKey: ["tps-relawan"] });
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <IconButton
        color="warning"
        onClick={() =>
          navigate(
            `/portal/relawan/edit-tps/${data.id}/relawan/${data.relawanId}/tps/${data.tpsId}`
          )
        }
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        color="secondary"
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

export default TableTPSRelawanAction;
