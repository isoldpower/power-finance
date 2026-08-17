import { TRANSACTION_TYPE_TONE } from "@shared/formatting";
import { Text } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";
import type { TransactionEntryType } from "@shared/formatting";


type EntryAmountFieldSignProps = PropsWithChildren<{
	type: TransactionEntryType;
}>;

const EntryAmountFieldSign: FC<EntryAmountFieldSignProps> = ({ children, type }) => (
	<Text as="span" family="display" size="2xl" className={TRANSACTION_TYPE_TONE[type]}>
		{children}
	</Text>
);

EntryAmountFieldSign.displayName = 'EntryAmountFieldSign';

export { EntryAmountFieldSign };
export type { EntryAmountFieldSignProps };
