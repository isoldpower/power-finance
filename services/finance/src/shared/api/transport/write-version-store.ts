import { READ_AT_LEAST_HEADER, WRITE_VERSION_HEADER } from "./config.ts";
import { readHeader } from "./response-headers.ts";

import type { ResponseHeaders } from "./response-headers.ts";


class WriteVersionStore {
	private writeVersion: string | null = null;

	public capture(responseHeaders: ResponseHeaders): void {
		const capturedVersion = readHeader(responseHeaders, WRITE_VERSION_HEADER);

		if (capturedVersion !== null) {
			this.writeVersion = capturedVersion;
		}
	}

	public headers(): Record<string, string> {
		return this.writeVersion
			? { [READ_AT_LEAST_HEADER]: this.writeVersion }
			: {};
	}
}

export { WriteVersionStore };
