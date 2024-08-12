/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_REDUX_PERSIST_VERSION: string;
  // Add other environment variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
