import { useMemo } from "react";
import { FALLBACK_TIMEZONE_IDS } from "./cache-config.ts";

import type { TimezoneMeta } from "@entity/localization";


interface UseTimezonesReturn {
	timezones: TimezoneMeta[];
	ids: string[];
	byId: Record<string, TimezoneMeta | undefined>;
}

type IntlWithCatalog = typeof Intl & {
	supportedValuesOf?: (key: string) => string[];
};

function supportedIds(): string[] {
	const catalog = (Intl as IntlWithCatalog)
		.supportedValuesOf
		?.('timeZone');

	return catalog === undefined || catalog.length === 0 
		? FALLBACK_TIMEZONE_IDS 
		: catalog;
}

function offsetOf(id: string): string {
	try {
		const parts = new Intl.DateTimeFormat('en-US', { 
			timeZone: id,
			timeZoneName: 'shortOffset',
		})
			.formatToParts(new Date());

		return parts.find((part) => {
			return part.type === 'timeZoneName';
		})?.value ?? '';
	} catch {
		return '';
	}
}

function toTimezoneMeta(id: string): TimezoneMeta {
	const segments = id.split('/');
	const city = (segments.at(-1) ?? id).replace(/_/g, ' ');

	return {
		id,
		city,
		area: segments.length > 1 
			? segments[0].replace(/_/g, ' ') 
			: '',
		offset: offsetOf(id),
	};
}

const useTimezones = (): UseTimezonesReturn => {
	return useMemo(() => {
		const timezones = supportedIds().map(toTimezoneMeta);

		return {
			timezones,
			ids: timezones.map((timezone) => timezone.id),
			byId: Object.fromEntries(timezones.map((timezone) => [
				timezone.id,
				timezone,
			])),
		};
	}, []);
};

export { useTimezones };
export type { UseTimezonesReturn };
