import { useMemo } from "react";
import { getByTag } from "locale-codes";

import type { LocaleMeta } from "@entity/localization";

const SUPPORTED_LOCALE_TAGS = ['en-US', 'fr-FR', 'de-DE', 'es-ES', 'it-IT'];

interface UseLocalesReturn {
	locales: LocaleMeta[];
	tags: string[];
	byTag: Record<string, LocaleMeta | undefined>;
}

const toLocaleMeta = (tag: string): LocaleMeta => {
	const entry = getByTag(tag);

	return {
		tag,
		name: entry.name,
		region: entry.location ?? '',
	};
};

const useLocales = (): UseLocalesReturn => {
	return useMemo(() => {
		const locales = Intl.NumberFormat
			.supportedLocalesOf(SUPPORTED_LOCALE_TAGS)
			.map(toLocaleMeta);

		return {
			locales,
			tags: locales.map((locale) => locale.tag),
			byTag: Object.fromEntries(locales.map((locale) => [locale.tag, locale])),
		};
	}, []);
};

export { useLocales };
export type { UseLocalesReturn };
