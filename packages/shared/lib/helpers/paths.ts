function joinRouteSegments(...segments: (string | number)[]): string {
	return segments
		.map(segment => String(segment))
		.reduce((acc, segment) => {
			if (!segment.trim()) return acc;

			const prevEndsWithSlash = acc.endsWith('/');
			const segmentStartsWithSlash = segment.startsWith('/');

			if (segment.match(/^[a-zA-Z]+:\/\//)) {
				return segment;
			}

			if (prevEndsWithSlash && segmentStartsWithSlash) {
				return acc + segment.slice(1);
			} else if (!prevEndsWithSlash && !segmentStartsWithSlash && acc.length > 0) {
				return acc + '/' + segment;
			} else {
				return acc + segment;
			}
		}, '')
		.replace(/([^:])\/+/g, '$1/');
}

export { joinRouteSegments };