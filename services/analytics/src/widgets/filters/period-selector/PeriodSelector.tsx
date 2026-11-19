import { useShallow } from "zustand/react/shallow";
import { PeriodTabs } from "@entity/filters";
import { useAnalyticsFilters } from "@feature/filters";
import { PERIOD_PRESETS } from "./config.ts";

import type { FC } from "react";


const PeriodSelector: FC = () => {
	const { preset, choosePreset } = useAnalyticsFilters(useShallow((state) => ({
		preset: state.preset,
		choosePreset: state.choosePreset,
	})));

	return (
		<PeriodTabs label="Period">
			{PERIOD_PRESETS.map((option) => (
				<PeriodTabs.Tab
					key={option.preset}
					selected={preset === option.preset}
					onSelect={() => { choosePreset(option.preset); }}
				>
					{option.label}
				</PeriodTabs.Tab>
			))}
		</PeriodTabs>
	);
};

PeriodSelector.displayName = 'PeriodSelector';

export { PeriodSelector };
