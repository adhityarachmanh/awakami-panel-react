import { createTheme } from "@mui/material";

export const primaryColor = "#1976d2";

export const secondaryColor = "#A9A9A9";

export const errorColor = "#f44336";

export const warningColor = "#ff9800";

export const infoColor = "#2196f3";

export const successColor = "#4caf50";

export const backgroundColorDefault = "#fafafa";

export const backgroundColorPaper = "#ffffff";

export const fontFamily = "Roboto, Arial, sans-serif";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },

    secondary: {
      main: secondaryColor,
    },
    error: {
      main: errorColor,
    },
    warning: {
      main: warningColor,
    },
    info: {
      main: infoColor,
    },

    success: {
      main: successColor,
    },

    background: {
      default: backgroundColorDefault,

      paper: backgroundColorPaper,
    },
  },
  typography: {
    fontFamily: fontFamily,
  },
});
