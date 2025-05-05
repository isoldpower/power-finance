import { federation } from "@module-federation/vite";
import type { FederationRemoteOptions } from "./types.ts";

export function buildFederationHost(
	options: FederationRemoteOptions
) {
	return federation({
		name: options.name,
		remotes: Object.fromEntries(
			options.remotes.map((remote) => [
				remote.name,
				{
					type: "module",
					name: remote.name,
					entry: `${remote.url}/remoteEntry.js`,
					entryGlobalName: remote.name,
					shareScope: "default",
				}
			])
		),
		filename: "remoteEntry.js",
		shared: ["react", "react-dom"],
	})
}