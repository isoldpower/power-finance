import { between, pick, roundCents } from "../random.ts";
import { ABROAD_SPOTS, HOTELS } from "./merchants.ts";
import { EVERYDAY, TRAVEL } from "./wallets.ts";

import type { SeedContext } from "./context.ts";


interface Trip {
	firstDay: number;
	lastDay: number;
	hotel: string;
}

const TRIPS: Trip[] = [
	{ firstDay: 140, lastDay: 147, hotel: HOTELS[0] },
	{ firstDay: 331, lastDay: 337, hotel: HOTELS[1] },
];

const TOP_UP_LEAD_DAYS = 3;
const TOP_UP_AMOUNT = 1300;

const findTrip = (dayIndex: number): Trip | undefined => {
	return TRIPS.find((trip) => dayIndex >= trip.firstDay && dayIndex <= trip.lastDay);
};

const isTraveling = (dayIndex: number): boolean => findTrip(dayIndex) !== undefined;

const emitTrips = (context: SeedContext): void => {
	const { day, random, emit, transfer } = context;

	if (TRIPS.some((trip) => trip.firstDay - TOP_UP_LEAD_DAYS === day.index)) {
		transfer(EVERYDAY, TRAVEL, TOP_UP_AMOUNT, 19);
	}

	const trip = findTrip(day.index);
	if (!trip) {
		return;
	}

	if (day.index === trip.firstDay) {
		emit({
			name: 'SkyWays',
			hour: 6,
			minute: 40,
			amount: roundCents(between(random, 380, 720)),
			side: 'expense',
			category: 'Travel',
			walletId: EVERYDAY,
		});
	}

	if (day.index < trip.lastDay) {
		emit({
			name: trip.hotel,
			hour: 21,
			amount: roundCents(between(random, 110, 180)),
			side: 'expense',
			category: 'Travel',
			walletId: TRAVEL,
		});
	}

	emit({
		name: pick(random, ABROAD_SPOTS),
		hour: 13,
		minute: 10,
		amount: roundCents(between(random, 18, 42)),
		side: 'expense',
		category: 'Dining',
		walletId: TRAVEL,
	});
	emit({
		name: pick(random, ABROAD_SPOTS),
		hour: 20,
		minute: 15,
		amount: roundCents(between(random, 35, 85)),
		side: 'expense',
		category: 'Dining',
		walletId: TRAVEL,
	});
	emit({
		name: 'City Rail',
		hour: 10,
		amount: roundCents(between(random, 4, 16)),
		side: 'expense',
		category: 'Transport',
		walletId: TRAVEL,
	});
};

export { emitTrips, isTraveling };
