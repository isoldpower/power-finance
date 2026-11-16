import type { DateRange } from "../types.ts";


const pad = (value: number): string => value.toString().padStart(2, '0');

const toDateInputValue = (iso: string): string => {
	const date = new Date(iso);

	const year = date.getFullYear().toString();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());

	return `${year}-${month}-${day}`;
};

const lastDayInputValue = (range: DateRange): string => {
	const untilMs = new Date(range.until).getTime();
	const lastInstant = new Date(untilMs - 1);

	return toDateInputValue(lastInstant.toISOString());
};

const rangeFromDateInputs = (first: string, last: string): DateRange | null => {
	const [fromYear, fromMonth, fromDay] = first.split('-').map(Number);
	const [toYear, toMonth, toDay] = last.split('-').map(Number);
	const since = new Date(fromYear, fromMonth - 1, fromDay);
	const until = new Date(toYear, toMonth - 1, toDay + 1);

	const invalidDate = Number.isNaN(since.getTime()) || Number.isNaN(until.getTime());
	const emptyRange = until <= since;

	if (invalidDate || emptyRange) {
		return null;
	}

	return { since: since.toISOString(), until: until.toISOString() };
};

export { lastDayInputValue, rangeFromDateInputs, toDateInputValue };
