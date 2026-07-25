import { SectionHeader, SlideOverTrigger } from "@shared/components";
import { cn } from "@internal/ui-library";

import type { FC } from "react";
import {
	SectionHeaderBorder,
	SectionHeaderCaption,
	SectionHeaderTitle
} from "@shared/components/section-header/SectionHeader.tsx";
import {useTransactionsPaginationContext} from "@feature/transactions/search-and-filtering/TransactionsPaginationContext.tsx";


interface TransactionsBrowserHeaderProps {
	createTransactionPanel: string;
}

const TransactionsBrowserHeader: FC<TransactionsBrowserHeaderProps> = ({
	createTransactionPanel,
}) => {
	const { total } = useTransactionsPaginationContext();

	return (
		<SectionHeader>
			<SectionHeaderTitle>
				Transactions
			</SectionHeaderTitle>
			<SectionHeaderCaption>
				{total.toString()} transactions
			</SectionHeaderCaption>
			<SectionHeaderBorder />
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
