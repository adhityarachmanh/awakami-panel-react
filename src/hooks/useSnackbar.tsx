import { createContext, useContext, useState, ReactNode } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

type AnchorOrigin = { vertical: "top" | "bottom"; horizontal: "left" | "right" };

type SnackbarContextType = {
  showSnackbar: (
    message: string,
    severity: "success" | "error" | "warning" | "info",
    duration?: number | null,
    anchorOrigin?: AnchorOrigin
  ) => void;
};

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");
  const [autoHideDuration, setAutoHideDuration] = useState<number | null>(6000);
  const [anchorOrigin, setAnchorOrigin] = useState<AnchorOrigin>({
    vertical: "bottom",
    horizontal: "right",
  });
  const showSnackbar = (
    message: string,
    severity: "success" | "error" | "warning" | "info",
    duration: number | null = 6000,
    anchorOrigin?: AnchorOrigin,
  ) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setAutoHideDuration(duration);
    setAnchorOrigin(anchorOrigin || { vertical: "bottom", horizontal: "right" });
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleCloseSnackbar}
        anchorOrigin={anchorOrigin}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
