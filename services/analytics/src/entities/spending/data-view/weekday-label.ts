const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const weekdayLabel = (mondayBasedIndex: number): string => WEEKDAY_LABELS[mondayBasedIndex] ?? '';

export { WEEKDAY_LABELS, weekdayLabel };
