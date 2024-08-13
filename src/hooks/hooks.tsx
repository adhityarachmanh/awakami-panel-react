import React from "react";
import { DialogProvider } from "./useDialog";
import { SnackbarProvider } from "./useSnackbar";
import { ConfirmationDialogProvider } from "./useConfirmationDialog";

const InjectAllProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DialogProvider>
      <ConfirmationDialogProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </ConfirmationDialogProvider>
    </DialogProvider>
  );
};

export default InjectAllProvider;
