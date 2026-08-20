import { useMemo } from "react";
import { resolveTimezone, useSettingsContext } from "@internal/shared";
import { TimezoneCombobox } from "@entity/localization";
import { useTimezones } from "@feature/localization";
import { useSelectTimezone } from "@feature/configuration";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { FC } from "react";


interface TimezoneSelectorProps {
	pivot?: FinanceComboboxPivot;
	className?: string;
}

const TimezoneSelector: FC<TimezoneSelectorProps> = ({ pivot, className }) => {
	const { timezone } = useSettingsContext();
	const currentTimezone = useMemo(() => resolveTimezone(timezone), [timezone]);
	const { timezones } = useTimezones();
	const { onSelect, isSaving } = useSelectTimezone();

	return (
		<TimezoneCombobox
			timezones={timezones}
			value={currentTimezone}
			onSelected={onSelect}
			pivot={pivot}
			className={className}
			isSaving={isSaving}
		/>
	);
};

TimezoneSelector.displayName = 'TimezoneSelector';

export { TimezoneSelector };
export type { TimezoneSelectorProps };
