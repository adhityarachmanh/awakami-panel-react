
import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { SnackbarProvider } from "./hooks/useSnackbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { rootStore, rootPersistor } from "../stores";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import {
  primaryColor,
  secondaryColor,
  errorColor,
  warningColor,
  infoColor,
  successColor,
  backgroundColorDefault,
  backgroundColorPaper,
  fontFamily,
} from "./constants/theme_constant";
import routes from "./router/routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Provider store={rootStore}>
            <PersistGate
              loading={<div>Loading...</div>}
              persistor={rootPersistor}
            >
              <ThemeProvider theme={muiTheme}>
                <RouterProvider router={routes} />
              </ThemeProvider>
            </PersistGate>
          </Provider>
        </Suspense>
      </SnackbarProvider>
    </QueryClientProvider>
  );
};

export default App;
