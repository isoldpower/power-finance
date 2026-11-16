import type { DateRange, Drill, FixedPreset, PeriodPreset } from "@entity/filters";


interface AnalyticsFilters {
	preset: PeriodPreset;
	customRange: DateRange | null;
	walletIds: string[];
	drill: Drill | null;
}

interface AnalyticsFiltersState extends AnalyticsFilters {
	choosePreset: (preset: FixedPreset) => void;
	chooseCustomRange: (range: DateRange) => void;
	toggleWallet: (walletId: string) => void;
	clearWallets: () => void;
	openDrill: (drill: Drill) => void;
	closeDrill: () => void;
}

type PersistedFilters = Pick<AnalyticsFilters, 'preset' | 'customRange' | 'walletIds'>;

export type { AnalyticsFilters, AnalyticsFiltersState, PersistedFilters };
