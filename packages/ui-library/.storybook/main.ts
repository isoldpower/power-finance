import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));

const config: StorybookConfig = {
	framework: "@storybook/react-vite",
	stories: ["../lib/**/*.stories.@(tsx)", "../lib/**/*.mdx"],
	addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
	viteFinal: async (cfg) => {
		cfg.plugins = cfg.plugins ?? [];
		cfg.plugins.push(tailwindcss());
		cfg.resolve = cfg.resolve ?? {};
		cfg.resolve.alias = {
			...(cfg.resolve.alias ?? {}),
			"@": resolve(projectRoot, "lib"),
		};
		return cfg;
	},
};

export default config;
