import type { FC } from "react";


interface CurrencyPickerOptionSelectedProps {
	children: boolean;
}

const CurrencyPickerOptionSelected: FC<CurrencyPickerOptionSelectedProps> = ({
	children,
}) => {
	return (
		<span className="ml-auto w-3 text-center font-semibold text-primary">
			{children ? '✓' : ''}
		</span>
	);
}

export { CurrencyPickerOptionSelected };