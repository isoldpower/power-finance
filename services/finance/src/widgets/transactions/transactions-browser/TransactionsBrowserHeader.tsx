import { NewWalletButton } from "@entity/wallets";
import { useTransactionsPaginationContext } from "@feature/transactions";
import { SectionHeader, SlideOverTrigger } from "@shared/components";

import type { FC } from "react";


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
				<NewWalletButton>
					<span>＋</span>
					<span>New transaction</span>
				</NewWalletButton>
			</SlideOverTrigger>
		</SectionHeader>
	);
}

export { TransactionsBrowserHeader };
export type { TransactionsBrowserHeaderProps };
