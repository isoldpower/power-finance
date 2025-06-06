import type {ViteConfigOptions, ViteConfigResolved} from "./types.ts";
import type {ConfigEnv} from "vite";

export const resolveConfigOptions = (
	env: ConfigEnv,
	overrides: ViteConfigOptions
): ViteConfigResolved => ({
	internal: overrides.internal || [
		'node_modules/@internal/**',
		'node_modules/@power/**'
	],
	dev: env.mode === 'development',
	prod: env.mode === 'production',
	paths: overrides.paths,
	port: overrides.port || 3000
})