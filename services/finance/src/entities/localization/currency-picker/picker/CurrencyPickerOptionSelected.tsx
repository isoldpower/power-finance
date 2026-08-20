import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface CurrencyPickerOptionSelectedProps {
	children: boolean;
}

const CurrencyPickerOptionSelected: FC<CurrencyPickerOptionSelectedProps> = ({ children }) => (
	<Text weight="semibold" tone="accent" className="ml-auto w-3 text-center">
		{children ? '✓' : ''}
	</Text>
);

CurrencyPickerOptionSelected.displayName = 'CurrencyPickerOptionSelected';

export { CurrencyPickerOptionSelected };
export type { CurrencyPickerOptionSelectedProps };
