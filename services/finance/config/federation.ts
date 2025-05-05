import { federation } from "@module-federation/vite";
import type { ConfigEnv } from "vite";

import type { FederationRemoteOptions } from "./types.ts";


export function buildFederationRemote(
	options: FederationRemoteOptions,
	env: ConfigEnv
) {
	const isTest = env.mode === 'test';

	return !isTest && federation({
		name: options.name,
		filename: options.filename ?? 'remoteEntry.js',
		exposes: {
			'./remote-app': './src/app/App.tsx',
		},
		shared: {
			'react': {
				singleton: true,
				strictVersion: true,
				requiredVersion: '>=19.0.0',
			},
			'react-dom': {
				singleton: true,
				strictVersion: true,
				requiredVersion: '>=19.0.0',
			},
		}
	})
}