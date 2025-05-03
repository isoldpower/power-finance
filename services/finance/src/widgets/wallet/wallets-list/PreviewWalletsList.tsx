import { cloneElement } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@internal/ui-library";
import { getFinanceRoute } from "@internal/shared";
import type { FC, ReactElement } from "react";

import { useWalletsList, WalletCardsListFx } from "@feature/wallet";
import { CardsListPending, CardsListError, CardsList } from "@entity/wallet";
import type { Wallet } from "@entity/wallet";


type PreviewWalletsListProps = {
	children: ReactElement<{ wallet: Wallet }>;
}

const PreviewWalletsList: FC<PreviewWalletsListProps> = ({ children }) => {
  const {status, wallets} = useWalletsList();

  return wallets.length > 0 || status === 'pending'
	? (
	  <WalletCardsListFx
		pending={<CardsListPending amount={3}/>}
		error={<CardsListError amount={3}/>}
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
	)
}

PreviewWalletsList.displayName = 'PreviewWalletsList';

export { PreviewWalletsList };
export type { PreviewWalletsListProps };