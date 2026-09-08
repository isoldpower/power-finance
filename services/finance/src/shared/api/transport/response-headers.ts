type ResponseHeaders = Record<string, unknown> | undefined;

function readHeader(responseHeaders: ResponseHeaders, headerName: string): string | null {
	if (!responseHeaders) {
		return null;
	}

	const lookupName = headerName.toLowerCase();
	const matchedEntry = Object.entries(responseHeaders)
		.find(([entryName]) => entryName.toLowerCase() === lookupName);
	const matchedValue = matchedEntry?.[1];

	return typeof matchedValue === 'string' && matchedValue.length > 0
		? matchedValue
		: null;
}

function readNumericHeader(responseHeaders: ResponseHeaders, headerName: string): number | null {
	const rawValue = readHeader(responseHeaders, headerName);
	if (rawValue === null) {
		return null;
	}

	const parsedValue = Number.parseInt(rawValue, 10);

	return Number.isNaN(parsedValue) ? null : parsedValue;
}

export { readHeader, readNumericHeader };
export type { ResponseHeaders };
