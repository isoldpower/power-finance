/// <reference types="vitest/config" />
import type { ConfigEnv } from "vite";
import { resolve } from "path";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import { buildFederationRemote } from "./config/federation.js";


export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		port: 3001,
		paths: {
			root: import.meta.dirname,
			src: resolve(import.meta.dirname, 'src'),
			output: resolve(import.meta.dirname, 'dist'),
			public: resolve(import.meta.dirname, 'public')
		}
	}

	return buildViteConfig({
		plugins: [
			buildFederationRemote({ name: 'analytics' }, env),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(__dirname, 'src', 'app', 'routes'),
				generatedRouteTree: resolve(__dirname, 'src', 'app', 'routeTree.gen.ts'),
			}),
		],
		server: {
			headers: {
				'Cache-Control': 'no-store'
			}
		},
		test: {
			globals: true,
			environment: 'jsdom',
			setupFiles: ['./test/vitest.setup.ts'],
			coverage: {
				enabled: true,
				reporter: ['text', 'json', 'html'],
			}
		},
		envPrefix: 'CLIENT_'
	}, options)(env);
}