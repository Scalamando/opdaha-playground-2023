/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

interface ImportMetaEnv {
	readonly VITE_APP_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
