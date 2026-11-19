import { between, chance, pick, roundCents } from "../random.ts";
import { CLIENTS } from "./merchants.ts";
import { CASH, EVERYDAY, SAVINGS } from "./wallets.ts";

import type { SeedContext } from "./context.ts";


const RAISE_FROM_DAY = 220;
const BASE_SALARY = 5200;
const RAISED_SALARY = 5450;
const DIVIDEND_MONTHS = [2, 5, 8, 11];
const WINTER_MONTHS = [0, 1, 11];
const FREELANCE_DAYS = [9, 23];

const emitIncome = (context: SeedContext): void => {
	const { day, random, emit } = context;

	if (day.monthDay === 1) {
		const salary = day.index >= RAISE_FROM_DAY ? RAISED_SALARY : BASE_SALARY;
		emit({
			name: 'Northwind Labs',
			hour: 9,
			minute: 5,
			amount: salary,
			side: 'income',
			category: 'Salary',
			walletId: EVERYDAY,
		});
	}

	if (FREELANCE_DAYS.includes(day.monthDay) && chance(random, 0.65)) {
		const amount = roundCents(between(random, 450, 1600));
		emit({
			name: pick(random, CLIENTS),
			hour: 16,
			amount,
			side: 'income',
			category: 'Freelance',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 15 && DIVIDEND_MONTHS.includes(day.month)) {
		const amount = roundCents(between(random, 120, 260));
		emit({
			name: 'Index Fund Dividend',
			hour: 14,
			amount,
			side: 'income',
			category: 'Investments',
			walletId: SAVINGS,
		});
	}

	if (day.isLastDayOfMonth) {
		const amount = roundCents(between(random, 24, 41));
		emit({ name: 'Savings Interest', hour: 23, amount, side: 'income', category: 'Interest', walletId: SAVINGS });
	}
};

const emitBills = (context: SeedContext): void => {
	const { day, random, emit, transfer } = context;
	const winterFactor = WINTER_MONTHS.includes(day.month) ? 1.4 : 1;

	if (day.monthDay === 1) {
		emit({
			name: 'Harbor Lofts',
			hour: 10,
			minute: 30,
			amount: 1750,
			side: 'expense',
			category: 'Rent',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 2) {
		transfer(EVERYDAY, SAVINGS, 900, 9);
	}
	if (day.monthDay === 10) {
		transfer(EVERYDAY, CASH, 160, 18);
	}

	if (day.monthDay === 3) {
		emit({
			name: 'FitClub',
			hour: 7,
			minute: 10,
			amount: 39,
			side: 'expense',
			category: 'Health',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 5) {
		const amount = roundCents(between(random, 95, 140) * winterFactor);
		emit({
			name: 'City Power & Water',
			hour: 11,
			minute: 20,
			amount,
			side: 'expense',
			category: 'Utilities',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 8) {
		emit({ name: 'FiberNet', hour: 6, amount: 59.99, side: 'expense', category: 'Utilities', walletId: EVERYDAY });
	}

	if (day.monthDay === 12) {
		emit({
			name: 'Streamly',
			hour: 3,
			amount: 15.99,
			side: 'expense',
			category: 'Subscriptions',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 18) {
		emit({
			name: 'CloudBox',
			hour: 3,
			amount: 9.99,
			side: 'expense',
			category: 'Subscriptions',
			walletId: EVERYDAY,
		});
	}

	if (day.monthDay === 21) {
		emit({ name: 'Wave Mobile', hour: 4, amount: 45, side: 'expense', category: 'Utilities', walletId: EVERYDAY });
	}
};

const emitMonthly = (context: SeedContext): void => {
	emitIncome(context);
	emitBills(context);
};

export { emitMonthly };
