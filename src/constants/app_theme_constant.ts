import { createTheme } from "@mui/material";

const primaryColor = "#1976d2";

const secondaryColor = "#A9A9A9";

const errorColor = "#f44336";

const warningColor = "#ff9800";

const infoColor = "#2196f3";

const successColor = "#4caf50";

const backgroundColorDefault = "#fafafa";

const backgroundColorPaper = "#ffffff";

const fontFamily = "Roboto, Arial, sans-serif";

const muiTheme = createTheme({
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

export {
  muiTheme,
  primaryColor,
  secondaryColor,
  errorColor,
  warningColor,
  infoColor,
  successColor,
  backgroundColorDefault,
  backgroundColorPaper,
  fontFamily,
};
