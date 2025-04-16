import type {ViteConfigResolved} from "../types.ts";
import type {UserConfig} from "vite";

export const buildPreview = (
	config: ViteConfigResolved
): NonNullable<UserConfig['preview']> => {
	return {
		port: config.port,
		strictPort: true
	}
}