import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { rootStore, rootPersistor } from "@/stores";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@emotion/react";
import { muiTheme } from "./constants/app_theme_constant";
import routes from "@/router/routes";
import InjectAllProvider from "./hooks/hooks";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import LanguageInjection from "./components/language/injection";
import queryClient from "./constants/app_query_client";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>Loading...</div>}>
        <PersistGate loading={<div>Loading...</div>} persistor={rootPersistor}>
          <Provider store={rootStore}>
            <ThemeProvider theme={muiTheme}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <InjectAllProvider>
                  <LanguageInjection>
                    <RouterProvider router={routes} />
                  </LanguageInjection>
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
