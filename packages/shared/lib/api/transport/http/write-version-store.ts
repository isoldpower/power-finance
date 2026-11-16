import { READ_AT_LEAST_HEADER, readResponseHeader, WRITE_VERSION_HEADER } from "../headers";

import type { ResponseHeaders } from "../headers";


class WriteVersionStore {
	private latestWriteVersion: string | null = null;

	public captureWriteVersion(responseHeaders: ResponseHeaders): void {
		const capturedWriteVersion = readResponseHeader(
			responseHeaders,
			WRITE_VERSION_HEADER,
		);

		if (capturedWriteVersion !== null) {
			this.latestWriteVersion = capturedWriteVersion;
		}
	}

	public readAtLeastHeaders(): Record<string, string> {
		if (this.latestWriteVersion === null) {
			return {};
		}

		return { 
			[READ_AT_LEAST_HEADER]: this.latestWriteVersion,
		};
	}
}

export { WriteVersionStore };
