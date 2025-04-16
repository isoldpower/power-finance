import { federation } from "@module-federation/vite";
import type { FederationRemoteOptions } from "./types.ts";

export function buildFederationHost(
	options: FederationRemoteOptions
) {
	return federation({
		name: options.name,
		remotes: {
			analytics: {
				type: "module",
				name: "analytics",
				entry: "http://localhost:3001/remoteEntry.js",
				entryGlobalName: "analytics",
				shareScope: "default",
			},
		},
		filename: "remoteEntry.js",
		shared: ["react", "react-dom"],
	})
}