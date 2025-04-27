/// <reference types="vite/client" />
interface ViteTypeOptions {
	strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
	readonly CLIENT_CLERK_PUBLIC_KEY: string
	readonly CLIENT_CURRENCY_URL: string
	readonly CLIENT_CURRENCY_ACCESS_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}