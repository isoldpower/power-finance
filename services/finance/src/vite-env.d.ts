/// <reference types="vite/client" />
interface ViteTypeOptions {
	strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
	readonly CLIENT_CLERK_PUBLIC_KEY: string
	readonly CLIENT_API_BASE_URL: string
	readonly CLIENT_API_MODE: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
