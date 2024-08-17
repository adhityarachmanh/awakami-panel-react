import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { rootStore, rootPersistor } from "../stores";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import {
  muiTheme,
} from "./constants/theme_constant";
import routes from "./router/routes";
import InjectAllProvider from "./hooks/hooks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <PersistGate loading={<div>Loading...</div>} persistor={rootPersistor}>
          <Provider store={rootStore}>
            <ThemeProvider theme={muiTheme}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <InjectAllProvider>
                  <RouterProvider router={routes} />
                </InjectAllProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </Provider>
        </PersistGate>
      </Suspense>
    </QueryClientProvider>
  );
};

export default App;
