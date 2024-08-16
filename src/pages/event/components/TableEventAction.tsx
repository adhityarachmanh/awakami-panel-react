import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";

import {
  DeleteOutlined,
  EditOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import EventService from "../services/EventService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "@/hooks/useSnackbar";
import { useNavigate } from "react-router-dom";
import { EventModel } from "../models/EventModel";

interface TableEventActionProps {
  data: EventModel;
}

const TableEventAction = ({ data }: TableEventActionProps) => {
  const queryClient = useQueryClient();
  const { showConfirmationDialog } = useConfirmationDialog();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const eventService = new EventService();
  const mutation = useMutation({
    mutationFn: (ids: string[]) => {
      return eventService.delete(ids);
    },
    onSuccess: () => {
      showSnackbar("Event berhasil dihapus", "success");
      queryClient.invalidateQueries({ queryKey: ["event"] });
    },
    onError: (error) => {
      showSnackbar(error.message, "error");
    },
  });
  return (
    <div className="wd-flex wd-flex-row wd-gap-2 ">
      <IconButton
        color="primary"
        onClick={() => navigate(`/portal/event/detail/${data.id}`)}
      >
        <VisibilityOutlined />
      </IconButton>
      <IconButton
        color="warning"
        onClick={() => navigate(`/portal/event/edit/${data.id}`)}
      >
        <EditOutlined />
      </IconButton>
      <IconButton
        color="secondary"
        onClick={() => {
          showConfirmationDialog(
            "Apakah Anda yakin ingin menghapus event ini?",
            "Apakah Anda yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.",

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

export default TableEventAction;
