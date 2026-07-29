import { defaultSettings } from './config.js';

const resolvedCache = new Map<string, string>();

const isUsableLocale = (locale: string): boolean => {
	try {
		return Intl.DateTimeFormat.supportedLocalesOf(locale).length > 0;
	} catch {
		return false;
	}
};

const resolveLocale = (locale?: string | null): string => {
	const candidate = locale?.trim() ?? '';

	if (!candidate) return defaultSettings.locale;

	const cached = resolvedCache.get(candidate);
	if (cached) return cached;

	const resolved = isUsableLocale(candidate) ? candidate : defaultSettings.locale;
	resolvedCache.set(candidate, resolved);

	return resolved;
};

export { resolveLocale };
