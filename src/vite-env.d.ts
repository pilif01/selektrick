/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean
  readonly PROD: boolean
  // add more env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

