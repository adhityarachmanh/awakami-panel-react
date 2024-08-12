import { configureStore } from "@reduxjs/toolkit";
import exampleReducer from "./reducers/exampleReducer";
import examplePresistReducer from "./reducers/examplePresistReducer";
import sidebarReducer from "./reducers/sidebarReducer";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import { PersistedState } from "redux-persist";
import { useDispatch, useSelector } from "react-redux";
import authReducer from "./reducers/authReducer";
import { encryptTransform } from "redux-persist-transform-encrypt";

export const encryptor = encryptTransform({
  secretKey: import.meta.env.VITE_REDUX_PERSIST_SECRET_KEY,
  onError: function (error) {
    console.log(error);
  },
});

const persistConfig = (key: string) => ({
  key,
  storage,
  version: parseInt(import.meta.env.VITE_REDUX_PERSIST_VERSION, 10),
  migrate: (state: PersistedState, version: number) => {
    if (state && state._persist && state._persist.version !== version) {
      storage.removeItem(`persist:${key}`);
    }
    return Promise.resolve(state);
  },
  transforms: [encryptor],
});

let rootStore = configureStore({
  reducer: {
    auth: persistReducer(persistConfig("xa"), authReducer),
    sidebar: persistReducer(persistConfig("xs"), sidebarReducer),
    example: exampleReducer,
    examplePresist: persistReducer(
      persistConfig("root"),
      examplePresistReducer
    ),
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

let rootPersistor = persistStore(rootStore);

export type RootState = ReturnType<typeof rootStore.getState>;
export type RootDispatch = typeof rootStore.dispatch;
export const useRootDispatch = useDispatch.withTypes<RootDispatch>();
export const useRootSelector = useSelector.withTypes<RootState>();

export { rootStore, rootPersistor };
