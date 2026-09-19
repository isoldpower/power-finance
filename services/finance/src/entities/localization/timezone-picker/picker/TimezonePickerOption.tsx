import { FinanceComboboxItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type TimezonePickerOptionProps = PropsWithChildren<{
	value: string;
	onSelect: () => void;
}>;

const TimezonePickerOption: FC<TimezonePickerOptionProps> = ({ value, onSelect, children }) => (
	<FinanceComboboxItem value={value} onSelect={onSelect}>
		{children}
	</FinanceComboboxItem>
);

TimezonePickerOption.displayName = 'TimezonePickerOption';

export { TimezonePickerOption };
export type { TimezonePickerOptionProps };
