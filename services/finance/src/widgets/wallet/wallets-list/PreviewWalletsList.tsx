import { cloneElement, FC, ReactElement } from "react";
import type { Wallet } from "@entity/wallet";
import {WalletCardsListFx} from "@feature/wallet/cards-list-fx/WalletCardsListFx.tsx";
import {CardsListPending} from "@entity/wallet/cards-list/CardsListPending.tsx";
import {useWalletsList} from "@feature/wallet";
import {CardsListError} from "@entity/wallet/cards-list/CardsListError.tsx";
import {CardsList} from "@entity/wallet/cards-list/CardsList.tsx";
import {Link} from "@tanstack/react-router";
import {getFinanceRoute} from "@internal/shared";
import { Button } from "@internal/ui-library";

type PreviewWalletsListProps = {
	children: ReactElement<{ wallet: Wallet }>;
}

const PreviewWalletsList: FC<PreviewWalletsListProps> = ({ children }) => {
	const { status, wallets } = useWalletsList();

	return (
		wallets.length > 0 || status === 'pending'
		? (
			<WalletCardsListFx
				pending={<CardsListPending amount={3} /> }
				error={<CardsListError amount={3} /> }
				status={status}
			>
				<CardsList>
					{wallets.slice(0, 3).map((wallet) => (
						cloneElement(children, {
							wallet,
							key: wallet.id
						})
					))}
				</CardsList>
			</WalletCardsListFx>
		)
		: (
			<div className="col-span-3 text-center py-10 border border-dashed rounded-lg">
				<p className="text-gray-500">No wallets found</p>
				<Button variant="link" asChild>
					<Link to={getFinanceRoute('wallets')}>
						Add your first wallet
					</Link>
				</Button>
			</div>
		))
}

PreviewWalletsList.displayName = 'PreviewWalletsList';

export { PreviewWalletsList };
export type { PreviewWalletsListProps };