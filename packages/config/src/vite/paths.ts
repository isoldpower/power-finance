import type {ViteConfigResolved} from "./types.ts";
import type {UserConfig} from "vite";

export const buildPaths = (
	config: ViteConfigResolved
): NonNullable<UserConfig['resolve']> => {
	return {
		preserveSymlinks: true,
		dedupe: ['react', 'react-dom'],
		alias: {
			"@src": `${config.paths.src}`,
			"@feature": `${config.paths.src}/features`,
			"@app": `${config.paths.src}/app`,
			"@entity": `${config.paths.src}/entities`,
			"@widget": `${config.paths.src}/widgets`,
			"@shared": `${config.paths.src}/shared`,
			"@process": `${config.paths.src}/processes`,
			"@page": `${config.paths.src}/pages`,
		}
	};
};
