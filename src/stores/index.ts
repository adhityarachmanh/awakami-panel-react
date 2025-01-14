import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./reducers/exampleReducer";
import examplePresistReducer from "./reducers/examplePresistReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { PersistedState, persistStore } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";
import languageReducer from "./reducers/languageReducer";

export const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY,
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = (key: string) => ({
  key,
  storage,
  version: parseFloat(import.meta.env.VITE_REDUX_PERSIST_VERSION),
  migrate: (state: PersistedState, version: number) => {
    if (state && state._persist && state._persist.version !== version) {
      storage.removeItem(`persist:${key}`);
    }
    return Promise.resolve(state);
  },
  transforms: [encryptor],
});

const rootStore = configureStore({
  reducer: {
    auth: persistReducer(persistConfig("xa"), authReducer),
    sidebar: persistReducer(persistConfig("xs"), sidebarReducer),
    language: persistReducer(persistConfig("xl"), languageReducer),
    example: exampleReducer,
    examplePresist: persistReducer(persistConfig("ex"), examplePresistReducer),
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

const rootPersistor = persistStore(rootStore);

export type RootState = ReturnType<typeof rootStore.getState>;
export type RootDispatch = typeof rootStore.dispatch;
export const useRootDispatch = useDispatch.withTypes<RootDispatch>();
export const useRootSelector = useSelector.withTypes<RootState>();

export { rootStore, rootPersistor };
