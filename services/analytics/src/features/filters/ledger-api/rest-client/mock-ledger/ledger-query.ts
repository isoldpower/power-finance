import { ApiError } from "@internal/shared";
import { UNCATEGORIZED_TOKEN } from "../../types.ts";
import { isSupportedCurrency } from "./rates.ts";
import { DAY_MS } from "./calendar.ts";

import type { MockLedger } from "./mock-ledger.ts";
import type { LedgerQuery, LedgerQueryParams, LedgerWindow } from "./types.ts";


const UNCATEGORIZED = UNCATEGORIZED_TOKEN;
const DEFAULT_WINDOW_DAYS = 30;
const MAX_WINDOW_DAYS = 5 * 366;
const DEFAULT_CURRENCY = 'USD';
const DEFAULT_TIMEZONE = 'UTC';

const invalid = (field: string, code: string, message: string): ApiError => {
	return new ApiError('validation_failed', message, { details: [{ field, code, message }] });
};

const toList = (value: string[] | string | undefined): string[] | null => {
	if (value === undefined) {
		return null;
	}

	const list = (Array.isArray(value) ? value : value.split(',')).map((item) => item.trim()).filter(Boolean);

	return list.length === 0 ? null : list;
};

const parseInstant = (value: string | undefined, fallback: number, field: string): number => {
	if (value === undefined) {
		return fallback;
	}

	const instant = new Date(value).getTime();
	if (Number.isNaN(instant)) {
		throw invalid(field, 'invalid', `${field} is not a valid datetime`);
	}

	return instant;
};

const parseWindow = (params: LedgerQueryParams): LedgerWindow => {
	const until = parseInstant(params.until, Date.now(), 'until');
	const since = parseInstant(params.since, until - DEFAULT_WINDOW_DAYS * DAY_MS, 'since');

	if (until <= since) {
		throw invalid('until', 'range_invalid', 'until must be after since');
	}
	if (until - since > MAX_WINDOW_DAYS * DAY_MS) {
		throw invalid('since', 'range_too_long', 'The window exceeds 5 years');
	}

	return { since, until };
};

const parseCurrency = (currency: string | undefined): string => {
	const code = (currency ?? DEFAULT_CURRENCY).toUpperCase();
	if (!isSupportedCurrency(code)) {
		throw new ApiError('unsupported_currency', `Currency ${code} is not supported`);
	}

	return code;
};

const parseWallets = (params: LedgerQueryParams, ledger: MockLedger): string[] | null => {
	const walletIds = toList(params.wallet_id);
	const unknown = walletIds?.find((walletId) => ledger.wallet(walletId) === undefined);

	if (unknown !== undefined) {
		throw invalid('wallet_id', 'wallet_unknown', `Wallet ${unknown} does not exist`);
	}

	return walletIds;
};

const parseCategories = (params: LedgerQueryParams, ledger: MockLedger): (string | null)[] | null => {
	const categoryIds = toList(params.category);
	const unknown = categoryIds?.find((categoryId) => (
		categoryId !== UNCATEGORIZED && ledger.category(categoryId) === undefined
	));

	if (unknown !== undefined) {
		throw invalid('category', 'category_unknown', `Category ${unknown} is not a transaction category`);
	}

	return categoryIds?.map((categoryId) => (categoryId === UNCATEGORIZED ? null : categoryId)) ?? null;
};

const parseLedgerQuery = (params: LedgerQueryParams, ledger: MockLedger): LedgerQuery => ({
	...parseWindow(params),
	currency: parseCurrency(params.currency),
	timezone: params.timezone ?? DEFAULT_TIMEZONE,
	walletIds: parseWallets(params, ledger),
	categories: parseCategories(params, ledger),
});

const previousWindow = (window: LedgerWindow): LedgerWindow => ({
	since: window.since - (window.until - window.since),
	until: window.since,
});

const parseLimit = (value: number | string | undefined, fallback: number, max: number): number => {
	if (value === undefined) {
		return fallback;
	}

	const limit = Number(value);
	if (!Number.isInteger(limit) || limit < 1 || limit > max) {
		throw invalid('limit', 'limit_out_of_range', `limit must be between 1 and ${max.toString()}`);
	}

	return limit;
};

export { invalid, parseLedgerQuery, parseLimit, previousWindow, UNCATEGORIZED };
