import { FinanceComboboxContent } from "@internal/ui-library";

import type { FinanceComboboxPivot } from "@internal/ui-library";
import type { FC, PropsWithChildren } from "react";


type CurrencyPickerContentProps = PropsWithChildren<{
	pivot?: FinanceComboboxPivot;
}>;

const CurrencyPickerContent: FC<CurrencyPickerContentProps> = ({ pivot, children }) => (
	<FinanceComboboxContent pivot={pivot}>
		{children}
	</FinanceComboboxContent>
);

CurrencyPickerContent.displayName = 'CurrencyPickerContent';

export { CurrencyPickerContent };
export type { CurrencyPickerContentProps };
