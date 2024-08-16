import React, { createContext, useContext, useState, ReactNode } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type DialogWidth = "xs" | "sm" | "md" | "lg" | "xl";
type DialogContextType = {
  showDialog: (
    title: string,
    content: (close: () => void) => ReactNode,
    options?: {
      actions?: ReactNode;
      showCloseButton?: boolean;
      width?: DialogWidth;
      fullWidth?: boolean;
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

  const [options, setOptions] = useState<{
    actions?: ReactNode;
    showCloseButton?: boolean;
    width?: DialogWidth;
    fullWidth?: boolean;
  }>({
    actions: null,
    showCloseButton: false,
    width: "xl",
    fullWidth: false,
  });

  const showDialog = (
    title: string,
    content: (close: () => void) => ReactNode,
    options?: {
      actions?: ReactNode;
      showCloseButton?: boolean;
      width?: DialogWidth;
      fullWidth?: boolean;
    }
  ) => {
    setDialogTitle(title);
    setDialogContent(content(handleCloseDialog));
 
    setDialogOpen(true);
    setOptions({
      actions: options?.actions || null,
      showCloseButton: options?.showCloseButton || false,
      width: options?.width || "xl",
      fullWidth: options?.fullWidth || false,
    });
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      <Dialog
        fullWidth={options?.fullWidth || false}
        maxWidth={options?.width || "xl"}
        open={dialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>{dialogContent}</DialogContent>
        {options?.actions ? (
          <DialogActions>
            {options?.actions}
            {options?.showCloseButton && (
              <Button onClick={handleCloseDialog}>Close</Button>
            )}
          </DialogActions>
        ) : null}
      </Dialog>
    </DialogContext.Provider>
  );
};
