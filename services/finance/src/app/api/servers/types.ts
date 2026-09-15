import type { WriteVersionStore } from "@shared/api";
import type { ApiMode } from "../config.ts";


interface ApiServerOptions {
	baseUrl: string;
	mode: ApiMode;
	sandbox?: string;
	versions: WriteVersionStore;
}

export type { ApiServerOptions };
