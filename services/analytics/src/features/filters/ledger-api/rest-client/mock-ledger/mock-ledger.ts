import { startOfLocalDay } from "./calendar.ts";
import { readFinanceSource } from "./finance-store.ts";
import { generateSeed } from "./seed/generate.ts";

import type { CategoryRefDto } from "../../types.ts";
import type { LedgerRow, LedgerSource, LedgerWallet } from "./types.ts";


interface SeedCache {
	day: number;
	source: LedgerSource;
}

let seedCache: SeedCache | null = null;

const seededSource = (now: number): LedgerSource => {
	const day = startOfLocalDay(now);
	if (seedCache?.day !== day) {
		seedCache = { day, source: generateSeed(now) };
	}

	return seedCache.source;
};

class MockLedger {
	private readonly source: LedgerSource;

	constructor(now: number = Date.now()) {
		this.source = readFinanceSource() ?? seededSource(now);
	}

	public wallets(): LedgerWallet[] {
		return this.source.wallets;
	}

	public rows(): LedgerRow[] {
		return this.source.rows;
	}

	public wallet(walletId: string): LedgerWallet | undefined {
		return this.source.wallets.find((wallet) => wallet.id === walletId);
	}

	public categories(): CategoryRefDto[] {
		return this.source.categories;
	}

	public category(categoryId: string): CategoryRefDto | undefined {
		return this.source.categories.find((category) => category.id === categoryId);
	}
}

export { MockLedger };
