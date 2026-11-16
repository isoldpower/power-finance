import { between, chance, pick, roundCents } from "../random.ts";
import { DINNER_SPOTS, GIFT_SHOPS, GROCERS, LUNCH_SPOTS, SHOPS, VENUES } from "./merchants.ts";
import { CASH, EVERYDAY } from "./wallets.ts";

import type { SeedContext } from "./context.ts";


const COURSE_DAYS = [60, 250];
const DECEMBER = 11;
const COMMUTE_FARE = 2.75;

const isWeekend = (weekday: number): boolean => weekday === 0 || weekday === 6;

const paidFrom = (context: SeedContext, cashShare: number): string => {
	return chance(context.random, cashShare) ? CASH : EVERYDAY;
};

const emitRoutine = (context: SeedContext): void => {
	const { day, random, emit } = context;
	if (day.traveling || isWeekend(day.weekday)) {
		return;
	}

	if (chance(random, 0.6)) {
		const minute = Math.floor(between(random, 5, 45));
		emit({
			name: 'Bean There',
			hour: 8,
			minute,
			amount: roundCents(between(random, 3.5, 6.5)),
			side: 'expense',
			category: 'Coffee',
			walletId: paidFrom(context, 0.4),
		});
	}

	if (chance(random, 0.82)) {
		emit({
			name: 'Metro Transit',
			hour: 8,
			minute: 50,
			amount: COMMUTE_FARE,
			side: 'expense',
			category: 'Transport',
			walletId: EVERYDAY,
		});
		emit({
			name: 'Metro Transit',
			hour: 18,
			minute: 20,
			amount: COMMUTE_FARE,
			side: 'expense',
			category: 'Transport',
			walletId: EVERYDAY,
		});
	}

	if (chance(random, 0.4)) {
		const minute = Math.floor(between(random, 10, 55));
		emit({
			name: pick(random, LUNCH_SPOTS),
			hour: 12,
			minute,
			amount: roundCents(between(random, 11, 24)),
			side: 'expense',
			category: 'Dining',
			walletId: EVERYDAY,
		});
	}
};

const emitLeisure = (context: SeedContext): void => {
	const { day, random, emit } = context;
	if (day.traveling) {
		return;
	}

	const groceryFactor = day.month === DECEMBER ? 1.2 : 1;
	if (chance(random, 0.33)) {
		const amount = roundCents(between(random, 35, 140) * groceryFactor);
		emit({
			name: pick(random, GROCERS),
			hour: Math.floor(between(random, 17, 21)),
			amount,
			side: 'expense',
			category: 'Groceries',
			walletId: paidFrom(context, 0.15),
		});
	}

	if ((isWeekend(day.weekday) || day.weekday === 5) && chance(random, 0.5)) {
		emit({
			name: pick(random, DINNER_SPOTS),
			hour: Math.floor(between(random, 19, 22)),
			amount: roundCents(between(random, 35, 95)),
			side: 'expense',
			category: 'Dining',
			walletId: EVERYDAY,
		});
	}

	if ((day.weekday === 5 || day.weekday === 6) && chance(random, 0.25)) {
		emit({
			name: 'QuickRide',
			hour: Math.floor(between(random, 22, 24)),
			amount: roundCents(between(random, 12, 28)),
			side: 'expense',
			category: 'Transport',
			walletId: EVERYDAY,
		});
	}

	if (chance(random, 0.12)) {
		emit({
			name: pick(random, SHOPS),
			hour: Math.floor(between(random, 12, 21)),
			amount: roundCents(between(random, 25, 220)),
			side: 'expense',
			category: 'Shopping',
			walletId: EVERYDAY,
		});
	}

	if (isWeekend(day.weekday) && chance(random, 0.3)) {
		emit({
			name: pick(random, VENUES),
			hour: Math.floor(between(random, 15, 22)),
			amount: roundCents(between(random, 15, 40)),
			side: 'expense',
			category: 'Entertainment',
			walletId: paidFrom(context, 0.3),
		});
	}
};

const emitOccasional = (context: SeedContext): void => {
	const { day, random, emit } = context;

	if (chance(random, 0.03)) {
		emit({
			name: 'Wellness Pharmacy',
			hour: Math.floor(between(random, 10, 19)),
			amount: roundCents(between(random, 20, 150)),
			side: 'expense',
			category: 'Health',
			walletId: EVERYDAY,
		});
	}

	if (chance(random, 0.025)) {
		emit({
			name: 'Misc payment',
			hour: Math.floor(between(random, 9, 21)),
			amount: roundCents(between(random, 5, 60)),
			side: 'expense',
			category: null,
			walletId: paidFrom(context, 0.5),
		});
	}

	if (chance(random, 0.04)) {
		emit({
			name: 'Store Refund',
			hour: Math.floor(between(random, 10, 18)),
			amount: roundCents(between(random, 15, 90)),
			side: 'income',
			category: 'Refunds',
			walletId: EVERYDAY,
		});
	}

	if (day.month === DECEMBER && day.monthDay <= 23 && chance(random, 0.3)) {
		emit({
			name: pick(random, GIFT_SHOPS),
			hour: Math.floor(between(random, 11, 20)),
			amount: roundCents(between(random, 30, 150)),
			side: 'expense',
			category: 'Gifts',
			walletId: EVERYDAY,
		});
	}

	if (COURSE_DAYS.includes(day.index)) {
		emit({ name: 'LearnHub', hour: 20, amount: 199, side: 'expense', category: 'Education', walletId: EVERYDAY });
	}
};

const emitDaily = (context: SeedContext): void => {
	emitRoutine(context);
	emitLeisure(context);
	emitOccasional(context);
};

export { emitDaily };
