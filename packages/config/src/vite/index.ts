import type {UserConfig} from "vite";
import {defineConfig} from "vite";

import type {ViteConfigOptions} from "./types.ts";
import {buildPlugins} from "./plugins/index.ts";
import {buildServer} from "./server/index.ts";
import {buildPreview} from "./preview/index.ts";
import {resolveConfigOptions} from "./options.ts";
import {buildPaths} from "./paths.ts";

export const buildViteConfig = (
	userConfig: UserConfig = {},
	options: ViteConfigOptions
) => defineConfig((env) => {
	const config = resolveConfigOptions(env, options);
	const { plugins, server, resolve, preview, ...rest } = userConfig;

	return {
		plugins: [
			...buildPlugins(config),
			...(plugins ?? [])
		],
		resolve: Object.assign(
			buildPaths(config),
			resolve ?? {}
		),
		preview: Object.assign(
			buildPreview(config),
			server ?? {}
		),
		server: Object.assign(
			buildServer(config),
			server ?? {}
		),
		...rest
	}
});

export type * from './types.ts';
