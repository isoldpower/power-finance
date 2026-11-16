import { delay } from "@internal/shared";
import {
	analyticsMeta,
	buildDays,
	convertRow,
	DAY_MS,
	invalid,
	isoWeekday,
	localDayKey,
	localHour,
	MockLedger,
	moneyDto,
	parseLedgerQuery,
	selectFlows,
} from "@feature/filters/ledger-api";

import type { CalendarDayDto, RhythmCellDto } from "../types.ts";
import type {
	IPatternsRESTApiClient,
	SpendingCalendarRequest,
	SpendingCalendarResponse,
	SpendingRhythmRequest,
	SpendingRhythmResponse,
} from "./types.ts";


interface DayTally {
	inflow: number;
	outflow: number;
	count: number;
}

const MAX_CALENDAR_DAYS = 366;
const WEEKDAYS = [1, 2, 3, 4, 5, 6, 7];
const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

class PatternsMockRESTApiClient implements IPatternsRESTApiClient {
	public async getCalendar(payload: SpendingCalendarRequest): Promise<SpendingCalendarResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		if (query.until - query.since > MAX_CALENDAR_DAYS * DAY_MS) {
			throw invalid('since', 'range_too_long', 'The calendar covers at most 366 days');
		}

		const tallies = new Map<string, DayTally>();
		selectFlows(ledger, query).forEach((row) => {
			const key = localDayKey(row.createdAt);
			const tally = tallies.get(key) ?? { inflow: 0, outflow: 0, count: 0 };
			const amount = convertRow(row, query.currency);

			if (row.side === 'income') {
				tally.inflow += amount;
			}
			else {
				tally.outflow += amount;
			}
			tally.count += 1;
			tallies.set(key, tally);
		});

		const days: CalendarDayDto[] = buildDays(query).map((day) => {
			const date = localDayKey(day.start);
			const tally = tallies.get(date) ?? { inflow: 0, outflow: 0, count: 0 };

			return {
				date,
				inflow: moneyDto(tally.inflow, query.currency),
				outflow: moneyDto(tally.outflow, query.currency),
				net: moneyDto(tally.inflow - tally.outflow, query.currency),
				transactions_count: tally.count,
			};
		});
		const peak = Math.max(0, ...[...tallies.values()].map((tally) => tally.outflow));

		return {
			data: { days, peak_outflow: moneyDto(peak, query.currency) },
			meta: analyticsMeta(query),
		};
	}

	public async getRhythm(payload: SpendingRhythmRequest): Promise<SpendingRhythmResponse> {
		await delay();

		const ledger = new MockLedger();
		const query = parseLedgerQuery(payload.params, ledger);
		const side = payload.params.type ?? 'expense';
		const grid = WEEKDAYS.map(() => HOURS.map(() => ({ amount: 0, count: 0 })));

		selectFlows(ledger, query, { side }).forEach((row) => {
			const cell = grid[isoWeekday(row.createdAt) - 1][localHour(row.createdAt)];
			cell.amount += convertRow(row, query.currency);
			cell.count += 1;
		});

		const slots = WEEKDAYS.flatMap((weekday) => HOURS.map((hour) => {
			const slot = grid[weekday - 1][hour];

			return { weekday, hour, amount: slot.amount, count: slot.count };
		}));
		const cells: RhythmCellDto[] = slots.map((slot) => ({
			weekday: slot.weekday,
			hour: slot.hour,
			amount: moneyDto(slot.amount, query.currency),
			transactions_count: slot.count,
		}));
		const peakCell = slots.reduce((best, slot) => (slot.amount > best.amount ? slot : best), slots[0]);

		return {
			data: {
				type: side,
				cells,
				peak: peakCell.amount > 0
					? { weekday: peakCell.weekday, hour: peakCell.hour, amount: moneyDto(peakCell.amount, query.currency) }
					: null,
			},
			meta: analyticsMeta(query),
		};
	}
}

export { PatternsMockRESTApiClient };
