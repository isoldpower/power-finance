import { FinanceComboboxList } from "@internal/ui-library";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerListProps = PropsWithChildren;

const CurrencyPickerList: FC<CurrencyPickerListProps> = ({ children }) => (
	<FinanceComboboxList>
		{children}
	</FinanceComboboxList>
);

CurrencyPickerList.displayName = 'CurrencyPickerList';

export { CurrencyPickerList };
export type { CurrencyPickerListProps };
