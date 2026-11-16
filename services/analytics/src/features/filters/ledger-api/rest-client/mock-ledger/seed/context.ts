import type { Random } from "../random.ts";
import type { LedgerRowSide } from "../types.ts";


interface SeedEntry {
	name: string;
	hour: number;
	minute?: number;
	amount: number;
	side: LedgerRowSide;
	category: string | null;
	walletId: string;
	currency?: string;
	chainId?: string;
}

interface SeedDay {
	date: Date;
	index: number;
	weekday: number;
	monthDay: number;
	month: number;
	isLastDayOfMonth: boolean;
	traveling: boolean;
}

interface SeedContext {
	day: SeedDay;
	random: Random;
	emit: (entry: SeedEntry) => void;
	transfer: (fromWalletId: string, toWalletId: string, amount: number, hour: number) => void;
}

export type { SeedContext, SeedDay, SeedEntry };
