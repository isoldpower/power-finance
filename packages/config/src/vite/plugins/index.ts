import type {UserConfig} from "vite";
import type {ViteConfigResolved} from "../types.ts";

import {buildReactPlugin} from "./react.ts";
import {buildCompressionPlugin} from "./compression.ts";
import {buildInspectPlugin} from "./inspect.ts";
import {buildRefreshPlugin} from "./restart.ts";
import {buildTailwindPlugin} from "./tailwind.ts";

export const buildPlugins = (
	config: ViteConfigResolved
): NonNullable<UserConfig['plugins']> => {
	return [
		buildReactPlugin(),
		buildCompressionPlugin(),
		buildTailwindPlugin(),
		config.dev && buildInspectPlugin(),
		config.dev && buildRefreshPlugin(config)
	].filter(Boolean) as NonNullable<UserConfig['plugins']>;
};
