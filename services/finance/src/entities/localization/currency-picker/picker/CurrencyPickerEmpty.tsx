import { FinanceComboboxEmpty } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerEmptyProps = PropsWithChildren;

const CurrencyPickerEmpty: FC<CurrencyPickerEmptyProps> = ({ children }) => (
	<FinanceComboboxEmpty>
		{children}
	</FinanceComboboxEmpty>
);

CurrencyPickerEmpty.displayName = 'CurrencyPickerEmpty';

export { CurrencyPickerEmpty };
export type { CurrencyPickerEmptyProps };
