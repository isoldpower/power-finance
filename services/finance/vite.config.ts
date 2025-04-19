import type { ConfigEnv } from "vite";
import { resolve } from "path";

import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import { buildFederationRemote } from "./config/federation.js";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		port: 3002,
		paths: {
			root: __dirname,
			src: resolve(__dirname, 'src'),
			output: resolve(__dirname, 'dist'),
			public: resolve(__dirname, 'public')
		}
	}

	return buildViteConfig({
		plugins: [
			buildFederationRemote({ name: 'finance' }),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(__dirname, 'src', 'app', 'routes'),
				generatedRouteTree: resolve(__dirname, 'src', 'app', 'routeTree.gen.ts'),
			}),
		],
		envPrefix: 'CLIENT_',
	}, options)(env);
}