import type {ViteConfigResolved} from "../types.ts";
import type {UserConfig} from "vite";

export const buildServer = (
	config: ViteConfigResolved
): NonNullable<UserConfig['server']> => {
	return {
		watch: {
			ignored: config.internal.map((module) => {
				return ['!**', module].join('/');
			})
		},
	}
}