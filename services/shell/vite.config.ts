import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import type { ConfigEnv } from "vite";
import { resolve } from "path";
import { env as processEnv } from "node:process";

import { buildFederationHost, buildUnavailableRemoteFallback } from "./config/federation.ts";
import type { FederationRemoteOptions } from "./config/types.ts";

const remoteDefinitions = [
	{ name: 'finance', url: processEnv.CLIENT_FINANCE_APP_URL },
	{ name: 'analytics', url: processEnv.CLIENT_ANALYTICS_APP_URL },
];
const availableRemotes = remoteDefinitions.filter(
	(remote) => Boolean(remote.url)
) as FederationRemoteOptions['remotes'];
const unavailableRemoteNames = remoteDefinitions
	.filter((remote) => !remote.url)
	.map((remote) => remote.name);

export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		port: 3000,
		paths: {
			root: import.meta.dirname,
			src: resolve(import.meta.dirname, 'src'),
			output: resolve(import.meta.dirname, 'dist'),
			public: resolve(import.meta.dirname, 'public')
		}
	}

	return buildViteConfig({
		envPrefix: 'CLIENT_',
		plugins: [
			buildUnavailableRemoteFallback(
				unavailableRemoteNames,
				resolve(options.paths.src, 'widgets', 'remotes', 'unavailable-remote', 'UnavailableRemoteApp.tsx')
			),
			buildFederationHost({
				name: 'shell',
				remotes: availableRemotes
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