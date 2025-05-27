/// <reference types="vitest/config" />
import type { ConfigEnv } from "vite";
import { resolve } from "path";

import type { ViteConfigOptions } from "@internal/config";
import { buildFederationRemote } from "./config/federation.js";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { buildViteConfig } from "@internal/config";


export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		port: 3002,
		paths: {
			root: import.meta.dirname,
			src: resolve(import.meta.dirname, 'src'),
			output: resolve(import.meta.dirname, 'dist'),
			public: resolve(import.meta.dirname, 'public')
		}
	}

	return buildViteConfig({
		plugins: [
			buildFederationRemote({ name: 'finance' }, env),
			TanStackRouterVite({
				target: 'react',
				autoCodeSplitting: true,
				routesDirectory: resolve(import.meta.dirname, 'src', 'app', 'routes'),
				generatedRouteTree: resolve(import.meta.dirname, 'src', 'app', 'routeTree.gen.ts'),
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