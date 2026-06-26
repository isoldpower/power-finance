import { cloneElement } from "react";
import { UiButton, Icons } from "@internal/ui-library";
import type { FC, ReactElement } from "react";

import { useWalletsList, WalletCardsListFx } from "@feature/wallet";
import { CardsListPending, CardsListError, CardsList } from "@entity/wallet";
import type { Wallet } from "@entity/wallet";


interface FullWalletsListProps {
	onCreate?: () => void;
	children: ReactElement<{ wallet: Wallet }>;
}

const FullWalletsList: FC<FullWalletsListProps> = ({ children, onCreate }) => {
	const { status, wallets } = useWalletsList();

	return wallets.length > 0 || ['pending', 'error'].includes(status)
		? (
			<WalletCardsListFx
				pending={<CardsListPending amount={6} /> }
				error={<CardsListError amount={6} /> }
				status={status}
			>
				<CardsList>
					{wallets.map((wallet) => (
						cloneElement(children, {
							wallet,
							key: wallet.id
						})
					))}
				</CardsList>
			</WalletCardsListFx>
		)
		: (
			<div className="col-span-3 text-center py-12 border border-dashed rounded-lg">
				<p className="text-gray-500">No wallets found</p>
				<p className="text-sm text-gray-400 mt-1">Add your first wallet to get started</p>
				<UiButton
					onClick={onCreate}
					className="mt-4"
					size="sm"
				>
					<div className="flex items-center gap-2">
						<Icons.Plus size={16} />
						Add Wallet
					</div>
				</UiButton>
			</div>
		)
}

FullWalletsList.displayName = 'FullWalletsList';

export { FullWalletsList };
export type { FullWalletsListProps };