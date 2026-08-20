import { useMemo } from "react";

import type { FC } from "react";
import type { TimezoneMeta } from "../../types.ts";


interface TimezonePickerLabelProps {
	timezones: TimezoneMeta[];
	children?: string;
	placeholder?: string;
}

const TimezonePickerLabel: FC<TimezonePickerLabelProps> = ({
	timezones,
	children: value,
	placeholder = "Select timezone",
}) => {
	const currentLabel = useMemo(() => {
		const selected = timezones.find((timezone) => timezone.id === value);

		if (!selected) return value ?? placeholder;

		return selected.offset
			? `${selected.city} · ${selected.offset}`
			: selected.city;
	}, [timezones, placeholder, value]);

	return (
		<span className="truncate">
			{currentLabel}
		</span>
	);
};

TimezonePickerLabel.displayName = 'TimezonePickerLabel';

export { TimezonePickerLabel };
export type { TimezonePickerLabelProps };
