export const getCleanPath = (path: string) => {
	let cleanPath = path.trim();

	if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);
	if (cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);

	return cleanPath;
}