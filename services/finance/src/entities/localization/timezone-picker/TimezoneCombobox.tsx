import {
	cn,
	FinanceCombobox,
	FinanceComboboxContent,
	FinanceComboboxEmpty,
	FinanceComboboxInput,
	FinanceComboboxItem,
	FinanceComboboxList,
	FinanceComboboxTrigger,
} from "@internal/ui-library";
import { TimezonePickerLabel } from "./picker/TimezonePickerLabel.tsx";
import { TimezonePickerOffset } from "./picker/TimezonePickerOffset.tsx";
import { TimezonePickerOptionSelected } from "./picker/TimezonePickerOptionSelected.tsx";
import { MetaText, Text } from "@shared/pure-components/typography";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { TimezoneMeta } from "../types.ts";
import type { FC, ReactNode } from "react";


interface TimezoneComboboxProps {
	timezones: TimezoneMeta[];
	value?: string;
	onSelected: (id: string) => void;
	pivot?: FinanceComboboxPivot;
	className?: string;
	placeholder?: string;
	notFound?: ReactNode;
	isSaving?: boolean;
}

const TimezoneCombobox: FC<TimezoneComboboxProps> = ({
	timezones,
	value,
	onSelected,
	pivot,
	className,
	placeholder,
	notFound,
	isSaving = false,
}) => {
	return (
		<FinanceCombobox>
			<FinanceComboboxTrigger
				aria-busy={isSaving}
				className={cn(
					"w-full transition-opacity",
					isSaving && "opacity-60",
					className,
				)}
			>
				<TimezonePickerLabel timezones={timezones} placeholder={placeholder}>
					{value}
				</TimezonePickerLabel>
			</FinanceComboboxTrigger>
			<FinanceComboboxContent pivot={pivot}>
				<FinanceComboboxInput placeholder="Search timezone..." />
				<FinanceComboboxList>
					<FinanceComboboxEmpty>
						{notFound ?? "No timezone found."}
					</FinanceComboboxEmpty>
					{timezones.map((timezone) => (
						<FinanceComboboxItem
							key={timezone.id}
							value={`${timezone.id} ${timezone.city} ${timezone.area} ${timezone.offset}`}
							onSelect={() => { onSelected(timezone.id); }}
						>
							<Text weight="semibold" truncate>
								{timezone.city}
							</Text>
							<MetaText size="10.5" truncate>
								{timezone.area}
							</MetaText>
							<TimezonePickerOffset>
								{timezone.offset}
							</TimezonePickerOffset>
							<TimezonePickerOptionSelected>
								{value === timezone.id}
							</TimezonePickerOptionSelected>
						</FinanceComboboxItem>
					))}
				</FinanceComboboxList>
			</FinanceComboboxContent>
		</FinanceCombobox>
	);
};

TimezoneCombobox.displayName = 'TimezoneCombobox';

export { TimezoneCombobox };
export type { TimezoneComboboxProps };
