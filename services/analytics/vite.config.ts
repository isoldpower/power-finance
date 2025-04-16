import type { ConfigEnv } from "vite";
import { resolve } from "path";

import type { ViteConfigOptions } from "@internal/config";
import { buildViteConfig } from "@internal/config";
import { buildFederationRemote } from "./config/federation.js";

export default (env: ConfigEnv) => {
	const options: ViteConfigOptions = {
		paths: {
			root: __dirname,
			src: resolve(__dirname, 'src'),
			output: resolve(__dirname, 'dist'),
			public: resolve(__dirname, 'public')
		}
	}

	return buildViteConfig({
		plugins: [ buildFederationRemote({ name: 'analytics' }) ],
		server: { port: 3001 },
		build: { target: 'chrome89' }
	}, options)(env);
}