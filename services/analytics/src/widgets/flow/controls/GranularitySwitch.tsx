import { useGranularityOptions } from "@feature/flow";
import { SegmentedSwitch } from "@shared/charts";
import { GRANULARITY_LABELS } from "./config.ts";

import type { FC } from "react";
import type { DateRange, Granularity } from "@entity/filters";


interface GranularitySwitchProps {
	range: DateRange;
	value: Granularity;
	onChange: (granularity: Granularity) => void;
}

const GranularitySwitch: FC<GranularitySwitchProps> = ({ range, value, onChange }) => {
	const options = useGranularityOptions(range, GRANULARITY_LABELS);

	return (
		<SegmentedSwitch
			label="Granularity"
			value={value}
			options={options}
			onChange={onChange}
		/>
	);
};

GranularitySwitch.displayName = 'GranularitySwitch';

export { GranularitySwitch };
export type { GranularitySwitchProps };
