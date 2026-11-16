const SIDE_LABEL = { expense: 'Expenses', income: 'Income' } as const;
const GRANULARITY_LABEL = { day: 'Day', week: 'Week', month: 'Month' } as const;
const MIDDAY_SUFFIX = 'T12:00:00';

export { GRANULARITY_LABEL, MIDDAY_SUFFIX, SIDE_LABEL };
