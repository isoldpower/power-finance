import { ApiError, delay, isCanonicalAmount, parseAmount, serializeAmount, unpaginated } from "@shared/api";
import { CURRENCY_CATALOG } from "./mock-seed.ts";
import type { CatalogEntry } from "./mock-seed.ts";
import type {
	CurrencyConvertRequest, CurrencyConvertResponse,
	CurrencyListRequest, CurrencyListResponse,
	CurrencyRatesRequest, CurrencyRatesResponse,
	ICurrenciesRESTApiClient,
} from "./types.ts";

const RATE_PRECISION = 12;

const toRateString = (rate: number): string => {
	return rate.toFixed(RATE_PRECISION).replace(/0+$/, '').replace(/\.$/, '');
};

const fractionDigits = (amount: string): number => amount.split('.')[1]?.length ?? 0;

const requireCurrency = (code: string): CatalogEntry => {
	const entry = CURRENCY_CATALOG.find((item) => item.code === code);
	if (!entry) throw new ApiError('unsupported_currency', `Currency ${code} is not supported`);

	return entry;
};

class CurrenciesMockRESTApiClient implements ICurrenciesRESTApiClient {
	public async list(_payload: CurrencyListRequest): Promise<CurrencyListResponse> {
		await delay();

		const page = unpaginated(CURRENCY_CATALOG.map(({ code, symbol, name, decimals }) => ({
			code,
			symbol,
			name,
			decimals,
		})));

		return { data: page.items, meta: { ...page.meta, cached: false } };
	}

	public async convert(payload: CurrencyConvertRequest): Promise<CurrencyConvertResponse> {
		const from = requireCurrency(payload.params.from_code);
		const to = requireCurrency(payload.params.to_code);
		const amount = payload.params.amount;

		if (!isCanonicalAmount(amount)) {
			throw new ApiError('validation_failed', 'Amount is not a canonical decimal string', [
				{ field: 'amount', code: 'amount_malformed', message: 'Amount must be a canonical decimal string' },
			]);
		}

		if (fractionDigits(amount) > from.decimals) {
			throw new ApiError('validation_failed', 'Amount carries too many fraction digits', [
				{
					field: 'amount',
					code: 'amount_precision',
					message: `${from.code} allows ${String(from.decimals)} fraction digits`,
				},
			]);
		}

		await delay();

		const rate = to.usdRate / from.usdRate;

		return {
			data: {
				from: { amount: serializeAmount(parseAmount(amount), from.decimals), currency: from.code },
				to: { amount: serializeAmount(parseAmount(amount) * rate, to.decimals), currency: to.code },
				rate: toRateString(rate),
			},
			meta: { fetched_at: new Date().toISOString(), cached: false },
		};
	}

	public async rates(payload: CurrencyRatesRequest): Promise<CurrencyRatesResponse> {
		const base = requireCurrency(payload.code);
		const target = payload.params?.target ?? null;

		await delay();

		const included = target
			? CURRENCY_CATALOG.filter((entry) => target.includes(entry.code))
			: CURRENCY_CATALOG;

		return {
			data: {
				base: base.code,
				rates: Object.fromEntries(
					included.map((entry) => [entry.code, toRateString(entry.usdRate / base.usdRate)]),
				),
			},
			meta: { fetched_at: new Date().toISOString(), target, cached: false },
		};
	}
}

export { CurrenciesMockRESTApiClient };
