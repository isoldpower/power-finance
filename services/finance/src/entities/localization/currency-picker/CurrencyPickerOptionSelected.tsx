import type { FC } from "react";
import { Text } from "@shared/pure-components/typography";


interface CurrencyPickerOptionSelectedProps {
	children: boolean;
}

const CurrencyPickerOptionSelected: FC<CurrencyPickerOptionSelectedProps> = ({
	children,
}) => {
	return (
		<Text weight="semibold" tone="accent" className="ml-auto w-3 text-center">
			{children ? '✓' : ''}
		</Text>
	);
}

export { CurrencyPickerOptionSelected };