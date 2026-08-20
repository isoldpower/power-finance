export const CURRENCY_CACHE_KEYS = {
	rates: 'currency-rates',
	currencies: 'currencies',
	convert: 'currency-convert',
};

export const SUPPORTED_LOCALE_TAGS = ['en-US', 'fr-FR', 'de-DE', 'es-ES', 'it-IT'];

export const FALLBACK_TIMEZONE_IDS = [
	'UTC',
	'America/New_York',
	'America/Chicago',
	'America/Los_Angeles',
	'America/Sao_Paulo',
	'Europe/London',
	'Europe/Berlin',
	'Europe/Paris',
	'Europe/Moscow',
	'Asia/Dubai',
	'Asia/Kolkata',
	'Asia/Shanghai',
	'Asia/Tokyo',
	'Australia/Sydney',
];

export const RATES_STALE_TIME = 5 * 60 * 1000;

export const CATALOG_STALE_TIME = 24 * 60 * 60 * 1000;