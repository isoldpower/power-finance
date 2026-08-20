import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";
import type { TransactionEntryType } from "../../types";


type EntryAmountFieldSignProps = PropsWithChildren<{
	type: TransactionEntryType;
}>;

const EntryAmountFieldSign: FC<EntryAmountFieldSignProps> = ({ children, type }) => (
	<Text 
		as="span"
		family="display"
		size="2xl"
		className={cn(
			type === 'expense' && 'text-neg',
			type === 'income' && 'text-pos',
			type === 'transfer' && 'text-primary'
		)}
	>
		{children}
	</Text>
);

EntryAmountFieldSign.displayName = 'EntryAmountFieldSign';

export { EntryAmountFieldSign };
export type { EntryAmountFieldSignProps };
