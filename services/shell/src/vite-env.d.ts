/// <reference types="vite/client" />
interface ViteTypeOptions {
	strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
	readonly CLIENT_CLERK_PUBLIC_KEY: string
	readonly CLIENT_FINANCE_APP_URL: string
	readonly CLIENT_ANALYTICS_APP_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}