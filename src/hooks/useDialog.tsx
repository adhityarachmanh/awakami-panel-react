import React, { createContext, useContext, useState, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type DialogContextType = {
  showDialog: (
    title: string,
    content: (close: () => void) => ReactNode,
    actions?: ReactNode,
    options?: {
      showCloseButton?: boolean;
    }
  ) => void;
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider");
  }
  return context;
};

export const DialogProvider = ({ children }: { children: ReactNode }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("");
  const [dialogContent, setDialogContent] = useState<ReactNode>(null);
  const [dialogActions, setDialogActions] = useState<ReactNode>(null);
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const showDialog = (
    title: string,
    content: (close: () => void) => ReactNode,
    actions?: ReactNode,
    options?: {
      showCloseButton?: boolean;
    }
  ) => {
    setDialogTitle(title);
    setDialogContent(content(handleCloseDialog));
    setDialogActions(actions);
    setDialogOpen(true);
    setShowCloseButton(options?.showCloseButton || false);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        {dialogActions ? (
          <DialogActions>
            {dialogActions}
            {showCloseButton && (
              <Button onClick={handleCloseDialog}>Close</Button>
            )}
          </DialogActions>
        ) : null}
      </Dialog>
    </DialogContext.Provider>
  );
};
