import { TRANSACTION_TYPE_TONE } from "@shared/formatting";
import { DisplayText } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";
import type { TransactionEntryType } from "@shared/formatting";


type EntryAmountFieldSymbolProps = PropsWithChildren<{
	type: TransactionEntryType;
}>;

const EntryAmountFieldSymbol: FC<EntryAmountFieldSymbolProps> = ({ children, type }) => (
	<DisplayText as="span" className={TRANSACTION_TYPE_TONE[type]}>
		{children}
	</DisplayText>
);

EntryAmountFieldSymbol.displayName = 'EntryAmountFieldSymbol';

export { EntryAmountFieldSymbol };
export type { EntryAmountFieldSymbolProps };
