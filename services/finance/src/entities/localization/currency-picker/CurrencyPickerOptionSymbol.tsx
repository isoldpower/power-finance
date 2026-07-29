import type { FC, ReactNode } from "react";


interface CurrencyPickerOptionSymbolProps {
	children: ReactNode;
}

const CurrencyPickerOptionSymbol: FC<CurrencyPickerOptionSymbolProps> = ({ 
	children,
}) => {
	return (
		<span className="inline-block w-6 shrink-0 truncate text-center font-display font-semibold">
			{children}
		</span>
	);
}

export { CurrencyPickerOptionSymbol };