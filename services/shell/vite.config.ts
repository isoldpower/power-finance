import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import type { ConfigEnv } from "vite";
import { resolve } from "path";
import { env as processEnv } from "node:process";

import { buildFederationHost } from "./config/federation.ts";
import type { FederationRemoteOptions } from "./config/types.ts";

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
			buildFederationHost({
				name: 'shell',
				remotes: [
					processEnv.CLIENT_FINANCE_APP_URL && { name: 'finance', url: processEnv.CLIENT_FINANCE_APP_URL },
					processEnv.CLIENT_ANALYTICS_APP_URL && { name: 'analytics', url: processEnv.CLIENT_ANALYTICS_APP_URL },
				].filter(Boolean) as FederationRemoteOptions['remotes']
			}),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(options.paths.src, 'app', 'routes'),
				generatedRouteTree: resolve(options.paths.src, 'app', 'routeTree.gen.ts'),
			})
		],
	}, options)(env);
}