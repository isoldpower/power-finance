import { FinanceComboboxItem } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerOptionProps = PropsWithChildren<{
	value: string;
	onSelect: () => void;
}>;

const CurrencyPickerOption: FC<CurrencyPickerOptionProps> = ({ value, onSelect, children }) => (
	<FinanceComboboxItem value={value} onSelect={onSelect}>
		{children}
	</FinanceComboboxItem>
);

CurrencyPickerOption.displayName = 'CurrencyPickerOption';

export { CurrencyPickerOption };
export type { CurrencyPickerOptionProps };
