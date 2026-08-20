import { FinanceCard, cn } from "@internal/ui-library";
import { WalletDetailsSkeleton } from "@entity/wallets";
import { SpaceOccupant } from "@shared/pure-components/layout";
import { textClass } from "@shared/pure-components/typography";

import type { Wallet } from "@entity/wallets";
import type { FC, ReactNode } from "react";


const PLACEHOLDER_ROWS = ['w1', 'w2', 'w3'];

interface WalletDetailsFxProps {
	isError: boolean;
	isPending: boolean;
	wallet: Wallet | undefined;
	children: (wallet: Wallet) => ReactNode;
}

const WalletDetailsFx: FC<WalletDetailsFxProps> = ({
	isError,
	isPending,
	wallet,
	children,
}) => {
	if (isError) {
		return (
			<FinanceCard className={cn(textClass({ size: '13', tone: 'negative' }), "px-6 py-16 text-center")}>
				Couldn't load this wallet.
			</FinanceCard>
		);
	} else if (isPending || !wallet) {
		return (
			<FinanceCard className="overflow-hidden">
				<WalletDetailsSkeleton>
					<WalletDetailsSkeleton.Header>
						<WalletDetailsSkeleton.Thumbnail>
							<WalletDetailsSkeleton.Swatch />
							<WalletDetailsSkeleton.Body>
								<WalletDetailsSkeleton.Title />
								<WalletDetailsSkeleton.Subtitle />
							</WalletDetailsSkeleton.Body>
							<WalletDetailsSkeleton.Actions>
								<WalletDetailsSkeleton.Action />
								<WalletDetailsSkeleton.Action size="sm" />
							</WalletDetailsSkeleton.Actions>
						</WalletDetailsSkeleton.Thumbnail>
						<WalletDetailsSkeleton.Balances>
							<WalletDetailsSkeleton.Balance />
							<SpaceOccupant />
							<WalletDetailsSkeleton.Metric />
							<WalletDetailsSkeleton.Metric />
						</WalletDetailsSkeleton.Balances>
					</WalletDetailsSkeleton.Header>
					<WalletDetailsSkeleton.Section />
					<WalletDetailsSkeleton.Rows>
						{PLACEHOLDER_ROWS.map((row) => (
							<WalletDetailsSkeleton.Row key={row} />
						))}
					</WalletDetailsSkeleton.Rows>
				</WalletDetailsSkeleton>
			</FinanceCard>
		);
	}

	return children(wallet);
}

export { WalletDetailsFx };
