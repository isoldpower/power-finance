import { READ_AT_LEAST_HEADER, WRITE_VERSION_HEADER } from "./config.ts";


class WriteVersionStore {
	private writeVersion: string | null = null;

	public capture(responseHeaders: Record<string, unknown> | undefined): void {
		const capturedVersion = responseHeaders?.[WRITE_VERSION_HEADER];

		if (typeof capturedVersion === 'string' && capturedVersion.length > 0) {
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
