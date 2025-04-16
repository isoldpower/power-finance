import restart from "vite-plugin-restart";
import type {ViteConfigResolved} from "../types.ts";

export const buildRefreshPlugin = (
	config: ViteConfigResolved
) => {
	return restart({
		restart: config.internal,
	})
}