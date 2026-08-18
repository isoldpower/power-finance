import { DisplayText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type CurrencyPickerOptionSymbolProps = PropsWithChildren;

const CurrencyPickerOptionSymbol: FC<CurrencyPickerOptionSymbolProps> = ({ children }) => (
	<DisplayText as="span" size="13" truncate className="inline-block w-6 shrink-0 text-center">
		{children}
	</DisplayText>
);

CurrencyPickerOptionSymbol.displayName = 'CurrencyPickerOptionSymbol';

export { CurrencyPickerOptionSymbol };
export type { CurrencyPickerOptionSymbolProps };
