/// <reference types="vitest/config" />
import type { ConfigEnv } from "vite";
import { resolve } from "path";

import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import { buildFederationRemote } from "./config/federation.js";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';


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
			buildFederationRemote({ name: 'finance' }, env),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(__dirname, 'src', 'app', 'routes'),
				generatedRouteTree: resolve(__dirname, 'src', 'app', 'routeTree.gen.ts'),
			}),
		],
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./test/vitest.setup.ts'],
			coverage: {
				enabled: true,
				reporter: ['text', 'json', 'html'],
			}
		},
		envPrefix: 'CLIENT_',
	}, options)(env);
}