import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import type { ConfigEnv } from "vite";
import { resolve } from "path";

import { buildFederationHost } from "./config/federation.ts";


export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		port: 3000,
		paths: {
			root: __dirname,
			src: resolve(__dirname, 'src'),
			output: resolve(__dirname, 'dist'),
			public: resolve(__dirname, 'public')
		}
	}

	return buildViteConfig({
		envPrefix: 'CLIENT_',
		plugins: [
			buildFederationHost({ name: 'shell' }),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(options.paths.src, 'app', 'routes'),
				generatedRouteTree: resolve(options.paths.src, 'app', 'routeTree.gen.ts'),
			})
		],
	}, options)(env);
}