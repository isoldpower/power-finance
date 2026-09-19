import { FinanceComboboxInput } from "@internal/ui-library";

import type { FC } from "react";


interface TimezonePickerSearchProps {
	placeholder?: string;
}

const TimezonePickerSearch: FC<TimezonePickerSearchProps> = ({
	placeholder = "Search timezone...",
}) => (
	<FinanceComboboxInput placeholder={placeholder} />
);

TimezonePickerSearch.displayName = 'TimezonePickerSearch';

export { TimezonePickerSearch };
export type { TimezonePickerSearchProps };
