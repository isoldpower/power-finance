import { FinanceComboboxInput } from "@internal/ui-library";

import type { FC } from "react";


interface CurrencyPickerSearchProps {
	placeholder?: string;
}

const CurrencyPickerSearch: FC<CurrencyPickerSearchProps> = ({
	placeholder = "Search currency...",
}) => (
	<FinanceComboboxInput placeholder={placeholder} />
);

CurrencyPickerSearch.displayName = 'CurrencyPickerSearch';

export { CurrencyPickerSearch };
export type { CurrencyPickerSearchProps };
