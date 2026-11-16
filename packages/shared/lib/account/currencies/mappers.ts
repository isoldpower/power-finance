import type { CurrencyMeta } from "../types.ts";
import type { CurrencyDto } from "./types.ts";


const currencyFromApi = (dto: CurrencyDto): CurrencyMeta => ({
	code: dto.code,
	symbol: dto.symbol,
	name: dto.name,
	decimals: dto.decimals,
});

export { currencyFromApi };
