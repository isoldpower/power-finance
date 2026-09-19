type ResponseHeaders = Record<string, unknown> | undefined;

function readResponseHeader(
	responseHeaders: ResponseHeaders,
	headerName: string,
): string | null {
	if (!responseHeaders) {
		return null;
	}

	const lowercasedHeaderName = headerName.toLowerCase();
	const matchedHeaderEntry = Object.entries(responseHeaders).find(([presentHeaderName]) => (
		presentHeaderName.toLowerCase() === lowercasedHeaderName
	));
	const matchedHeaderValue = matchedHeaderEntry?.[1];

	return typeof matchedHeaderValue === 'string' && matchedHeaderValue.length > 0
		? matchedHeaderValue
		: null;
}

function readNumericResponseHeader(
	responseHeaders: ResponseHeaders,
	headerName: string,
): number | null {
	const rawHeaderValue = readResponseHeader(responseHeaders, headerName);

	if (rawHeaderValue === null) {
		return null;
	}

	const parsedHeaderValue = Number.parseInt(rawHeaderValue, 10);

	return Number.isNaN(parsedHeaderValue) ? null : parsedHeaderValue;
}

export { readNumericResponseHeader, readResponseHeader };
export type { ResponseHeaders };
