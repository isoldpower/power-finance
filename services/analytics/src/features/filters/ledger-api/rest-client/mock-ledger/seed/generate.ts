import { convertAmount } from "../rates.ts";
import { createRandom, roundCents } from "../random.ts";
import { addLocalDays, startOfLocalDay } from "../calendar.ts";
import { emitDaily } from "./daily.ts";
import { emitMonthly } from "./monthly.ts";
import { emitTrips, isTraveling } from "./trips.ts";
import { SEED_WALLETS } from "./wallets.ts";
import { BUILT_IN_CATEGORIES, collectCategories, seedCategory } from "../categories.ts";

import type { LedgerRow, LedgerSource, LedgerWallet } from "../types.ts";
import type { SeedContext, SeedDay, SeedEntry } from "./context.ts";


const SEED = 20261112;
const SPAN_DAYS = 420;

const walletById = (walletId: string): LedgerWallet => {
	const wallet = SEED_WALLETS.find((candidate) => candidate.id === walletId);
	if (!wallet) {
		throw new Error(`Unknown seed wallet ${walletId}`);
	}

	return wallet;
};

const toSeedDay = (instant: number, index: number): SeedDay => {
	const date = new Date(instant);
	const tomorrow = new Date(addLocalDays(instant, 1));

	return {
		date,
		index,
		weekday: date.getDay(),
		monthDay: date.getDate(),
		month: date.getMonth(),
		isLastDayOfMonth: tomorrow.getDate() === 1,
		traveling: isTraveling(index),
	};
};

const generateSeed = (now: number): LedgerSource => {
	const random = createRandom(SEED);
	const rows: LedgerRow[] = [];
	const firstDay = startOfLocalDay(now - SPAN_DAYS * 24 * 60 * 60 * 1000);
	let sequence = 0;

	const pushRow = (day: SeedDay, entry: SeedEntry): void => {
		const instant = new Date(day.date);
		instant.setHours(entry.hour, entry.minute ?? 0, 0, 0);
		if (instant.getTime() > now) {
			return;
		}

		sequence += 1;
		rows.push({
			id: `seed_${sequence.toString()}`,
			name: entry.name,
			createdAt: instant.getTime(),
			amount: entry.amount,
			currency: entry.currency ?? walletById(entry.walletId).currency,
			side: entry.side,
			category: seedCategory(entry.category),
			walletId: entry.walletId,
			chainId: entry.chainId ?? null,
		});
	};

	for (let index = 0; index <= SPAN_DAYS; index += 1) {
		const day = toSeedDay(addLocalDays(firstDay, index), index);
		const emit = (entry: SeedEntry): void => { pushRow(day, entry); };
		const transfer = (fromWalletId: string, toWalletId: string, amount: number, hour: number): void => {
			const from = walletById(fromWalletId);
			const to = walletById(toWalletId);
			const chainId = `chain_${index.toString()}_${toWalletId}`;
			const received = roundCents(convertAmount(amount, from.currency, to.currency));

			emit({
				name: `Transfer to ${to.name}`,
				hour,
				amount,
				side: 'expense',
				category: null,
				walletId: from.id,
				chainId,
			});
			emit({
				name: `Transfer from ${from.name}`,
				hour,
				amount: received,
				side: 'income',
				category: null,
				walletId: to.id,
				chainId,
			});
		};
		const context: SeedContext = { day, random, emit, transfer };

		emitMonthly(context);
		emitTrips(context);
		emitDaily(context);
	}

	const ordered = rows.sort((left, right) => left.createdAt - right.createdAt);

	return {
		wallets: SEED_WALLETS,
		rows: ordered,
		categories: collectCategories(ordered, BUILT_IN_CATEGORIES),
	};
};

export { generateSeed };
