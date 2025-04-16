import { federation } from "@module-federation/vite";
import type { FederationRemoteOptions } from "./types.ts";

export function buildFederationRemote(
	options: FederationRemoteOptions
) {
	return federation({
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