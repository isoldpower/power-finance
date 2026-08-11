import type { FC, ReactNode } from "react";
import { DisplayText } from "@shared/pure-components/typography";


interface CurrencyPickerOptionSymbolProps {
	children: ReactNode;
}

const CurrencyPickerOptionSymbol: FC<CurrencyPickerOptionSymbolProps> = ({ 
	children,
}) => {
	return (
		<DisplayText as="span" size="13" truncate className="inline-block w-6 shrink-0 text-center">
			{children}
		</DisplayText>
	);
}

export { CurrencyPickerOptionSymbol };