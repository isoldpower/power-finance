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

	const label = useMemo(() => {
		const selected = timezones.find((entry) => {
			return entry.id === currentTimezone;
		});

		if (!selected) {
			return currentTimezone;
		}
		return selected.offset 
			? `${selected.city} · ${selected.offset}` 
			: selected.city;
	}, [currentTimezone, timezones]);

	return (
		<TimezoneCombobox>
			<TimezoneCombobox.Trigger className={className} isSaving={isSaving}>
				<TimezoneCombobox.Label>
					{label}
				</TimezoneCombobox.Label>
			</TimezoneCombobox.Trigger>
			<TimezoneCombobox.Content pivot={pivot}>
				<TimezoneCombobox.Search />
				<TimezoneCombobox.List>
					<TimezoneCombobox.Empty>
						No timezone found.
					</TimezoneCombobox.Empty>
					{timezones.map((timezone) => (
						<TimezoneCombobox.Option
							key={timezone.id}
							value={`${timezone.id} ${timezone.city} ${timezone.area} ${timezone.offset}`}
							onSelect={() => { onSelect(timezone.id); }}
						>
							<TimezoneCombobox.OptionCity>
								{timezone.city}
							</TimezoneCombobox.OptionCity>
							<TimezoneCombobox.OptionArea>
								{timezone.area}
							</TimezoneCombobox.OptionArea>
							<TimezoneCombobox.Offset>
								{timezone.offset}
							</TimezoneCombobox.Offset>
							<TimezoneCombobox.OptionSelected>
								{currentTimezone === timezone.id}
							</TimezoneCombobox.OptionSelected>
						</TimezoneCombobox.Option>
					))}
				</TimezoneCombobox.List>
			</TimezoneCombobox.Content>
		</TimezoneCombobox>
	);
};

TimezoneSelector.displayName = 'TimezoneSelector';

export { TimezoneSelector };
export type { TimezoneSelectorProps };
