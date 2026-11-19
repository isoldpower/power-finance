import { Icons } from "@internal/ui-library";
import { RangePicker } from "@entity/filters";
import { useCustomRangeInputs } from "@feature/filters";

import type { FC } from "react";


const CustomRangePicker: FC = () => {
	const {
		active,
		firstDay,
		lastDay,
		today,
		handleFirstDayChange,
		handleLastDayChange,
	} = useCustomRangeInputs();

	return (
		<RangePicker active={active}>
			<RangePicker.Input
				label="From"
				value={firstDay}
				max={lastDay}
				onChange={handleFirstDayChange}
			/>
			<Icons.ArrowRight aria-hidden size={14} className="text-text-3" />
			<RangePicker.Input
				label="To"
				value={lastDay}
				min={firstDay}
				max={today}
				onChange={handleLastDayChange}
			/>
		</RangePicker>
	);
};

CustomRangePicker.displayName = 'CustomRangePicker';

export { CustomRangePicker };
