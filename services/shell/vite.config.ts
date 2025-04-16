import type {ViteConfigOptions} from "@internal/config";
import {buildViteConfig} from "@internal/config";
import type {ConfigEnv} from "vite";
import {resolve} from "path";

import {buildFederationHost} from "./config/federation.ts";

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
		plugins: [ buildFederationHost({ name: 'shell' }) ],
		server: { port: 3000 },
		build: { target: 'chrome89' }
	}, options)(env);
}