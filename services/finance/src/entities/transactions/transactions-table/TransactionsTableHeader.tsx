import type { FC } from "react";
import { Overline } from "@shared/pure-components/typography";

interface TransactionsTableHeaderProps {
	targetCurrency: string;
}

const TransactionsTableHeader: FC<TransactionsTableHeaderProps> = ({ targetCurrency }) => (
	<Overline size="10" tracking="0.06em" className="flex items-center border-b border-border bg-secondary px-4 py-2.5">
		<div className="w-[22px]" />
		<div className="w-[74px]">Date</div>
		<div className="flex-1">Description</div>
		<div className="hidden w-[130px] md:block">Wallet</div>
		<div className="hidden w-[108px] md:block">Category</div>
		<div className="w-[104px] text-right">Amount</div>
		<div className="hidden w-[104px] text-right md:block">{targetCurrency}</div>
		<div className="w-[26px]" />
	</Overline>
);

TransactionsTableHeader.displayName = 'TransactionsTableHeader';

export { TransactionsTableHeader };
export type { TransactionsTableHeaderProps };
