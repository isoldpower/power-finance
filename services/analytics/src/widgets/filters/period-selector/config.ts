import type { FixedPreset } from "@entity/filters";


interface PresetOption {
	preset: FixedPreset;
	label: string;
}

const PERIOD_PRESETS: PresetOption[] = [
	{ preset: '1M', label: '1M' },
	{ preset: '3M', label: '3M' },
	{ preset: '6M', label: '6M' },
	{ preset: 'YTD', label: 'YTD' },
	{ preset: '1Y', label: '1Y' },
];

export { PERIOD_PRESETS };
export type { PresetOption };
