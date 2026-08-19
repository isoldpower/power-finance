import { cn } from "@internal/ui-library";
import { DisplayText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";
import type { TransactionEntryType } from "../../types.ts";


type EntryAmountFieldSymbolProps = PropsWithChildren<{
	type: TransactionEntryType;
}>;

const EntryAmountFieldSymbol: FC<EntryAmountFieldSymbolProps> = ({ children, type }) => (
	<DisplayText
		as="span"
		className={cn(
			type === 'expense' && 'text-neg',
			type === 'income' && 'text-pos',
			type === 'transfer' && 'text-primary'
		)}
	>
		{children}
	</DisplayText>
);

EntryAmountFieldSymbol.displayName = 'EntryAmountFieldSymbol';

export { EntryAmountFieldSymbol };
export type { EntryAmountFieldSymbolProps };
