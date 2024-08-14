import React, { createContext, useContext, useState, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type ConfirmationDialogColor =
  | "inherit"
  | "primary"
  | "secondary"
  | "success"
  | "error"
  | "info"
  | "warning";

type ConfirmationDialogContextType = {
  showConfirmationDialog: (
    title: string,
    content: ReactNode,
    onAccept: () => void,
    onReject?: () => void,
    options?: {
      acceptLabel?: string;
      acceptColor?: ConfirmationDialogColor;
      rejectLabel?: string;
      rejectColor?: ConfirmationDialogColor;
    }
  ) => void;
};

const ConfirmationDialogContext = createContext<
  ConfirmationDialogContextType | undefined
>(undefined);

export const useConfirmationDialog = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within a ConfirmationDialogProvider"
    );
  }
  return context;
};

export const ConfirmationDialogProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [onAcceptCallback, setOnAcceptCallback] = useState<() => void>(
    () => {}
  );
  const [onRejectCallback, setOnRejectCallback] = useState<() => void>(
    () => {}
  );
  const [acceptLabel, setAcceptLabel] = useState<string>("Accept");
  const [rejectLabel, setRejectLabel] = useState<string>("Cancel");
  const [acceptColor, setAcceptColor] =
    useState<ConfirmationDialogColor>("primary");
  const [rejectColor, setRejectColor] =
    useState<ConfirmationDialogColor>("secondary");

  const showConfirmationDialog = (
    title: string,
    content: ReactNode,
    onAccept: () => void,
    onReject?: () => void,
    options?: {
      acceptLabel?: string;
      acceptColor?: ConfirmationDialogColor;
      rejectLabel?: string;
      rejectColor?: ConfirmationDialogColor;
    }
  ) => {
    setDialogTitle(title);
    setDialogContent(content);
    setOnAcceptCallback(() => onAccept);
    setOnRejectCallback(() => onReject || (() => {}));
    setAcceptLabel(options?.acceptLabel || "Accept");
    setRejectLabel(options?.rejectLabel || "Cancel");
    setAcceptColor(options?.acceptColor || "primary");
    setRejectColor(options?.rejectColor || "secondary");
    setDialogOpen(true);
  };

  const handleAccept = () => {
    onAcceptCallback();
    setDialogOpen(false);
  };

  const handleReject = () => {
    onRejectCallback();
    setDialogOpen(false);
  };

  return (
    <ConfirmationDialogContext.Provider  value={{ showConfirmationDialog }}>
      {children}
      <Dialog open={dialogOpen} onClose={handleReject}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        <DialogActions>
          <Button onClick={handleReject} color={rejectColor}>
            {rejectLabel}
          </Button>
          <Button onClick={handleAccept} color={acceptColor}>
            {acceptLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationDialogContext.Provider>
  );
};
