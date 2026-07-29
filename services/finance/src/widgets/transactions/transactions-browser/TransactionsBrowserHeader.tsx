import { SectionHeader, SlideOverTrigger } from "@shared/components";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import { useTransactionsPaginationContext } from "@feature/transactions";


interface TransactionsBrowserHeaderProps {
	createTransactionPanel: string;
}

const TransactionsBrowserHeader: FC<TransactionsBrowserHeaderProps> = ({
	createTransactionPanel,
}) => {
	const { total } = useTransactionsPaginationContext();

	return (
		<SectionHeader>
			<SectionHeader.Title>
				Transactions
			</SectionHeader.Title>
			<SectionHeader.Caption>
				{total.toString()} transactions
			</SectionHeader.Caption>
			<SectionHeader.Border />
			<SlideOverTrigger panelId={createTransactionPanel}>
				<button
					type="button"
					className={cn(
						"flex flex-row gap-2 items-center",
						"text-xs font-semibold text-primary hover:underline"
					)}
				>
					<span>＋</span>
					<span>New transaction</span>
				</button>
			</SlideOverTrigger>
		</SectionHeader>
	);
}

export { TransactionsBrowserHeader };
export type { TransactionsBrowserHeaderProps };
