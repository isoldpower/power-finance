const padHour = (hour: number): string => hour.toString().padStart(2, '0');

const hourLabel = (hour: number): string => `${padHour(hour)}:00`;

const hourTickLabel = (hour: number): string => `${padHour(hour)}h`;

const hourRangeLabel = (hour: number): string => `${hourLabel(hour)}–${hourLabel(hour + 1)}`;

export { hourLabel, hourRangeLabel, hourTickLabel };
