/// <reference types="vite/client" />
interface ViteTypeOptions {
	strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
	readonly CLIENT_CLERK_PUBLIC_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}