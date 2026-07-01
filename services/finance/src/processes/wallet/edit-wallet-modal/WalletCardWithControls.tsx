import {UiButton, cn, Icons} from "@internal/ui-library";
import { useMemo, type FC } from "react";

import {
	useWallet,
	useWalletMutationsState,
	useCardBalance,
	WalletCardFx,
	WalletCardBoundaries
} from "@feature/wallets";
import {
	CardUnavailableWrapper,
	CardErrorWrapper,
	WalletCard,
	CardPending,
	CardError
} from "@entity/wallet";
import { EditWalletModalProcess } from "./EditWalletModalProcess.tsx";
import { DeleteWalletModalProcess } from "./DeleteWalletModalProcess.tsx";
import type { Wallet } from "@entity/wallet";


interface WalletCardWithControlsProps {
	wallet: Wallet;
}

const WalletCardWithControls: FC<WalletCardWithControlsProps> = ({
	wallet: passedWallet,
}) => {
	const { isMutating } = useWalletMutationsState(passedWallet.id);
	const { fetchStatus, status } = useWallet(passedWallet.id);
	const balance = useCardBalance(passedWallet);

	const memoizedContents = useMemo(() => (
		<WalletCard>
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="font-medium">{passedWallet.name}</h3>
					<p className="text-xs text-silent">
						{passedWallet.credit ? 'Credit Account' : 'Debit Account'}
					</p>
				</div>
				<div className="flex space-x-1 [&>*]:z-20">
					<EditWalletModalProcess wallet={passedWallet}>
						<UiButton type="button" variant="ghost" size="sm" color="neutral">
							<Icons.Edit size={15} />
						</UiButton>
					</EditWalletModalProcess>
					<DeleteWalletModalProcess wallet={passedWallet}>
						<UiButton type="button" variant="ghost" size="sm" className="text-red-800 dark:text-red-500">
							<Icons.Trash size={15} />
						</UiButton>
					</DeleteWalletModalProcess>
				</div>
			</div>
			<div className="mt-2">
				<span className={cn(
					'text-lg font-bold',
					(
						(passedWallet.balance.amount < 0 && !passedWallet.credit) ||
						(passedWallet.balance.amount > 0 && passedWallet.credit)
					) ? 'text-red-700' : 'text-green-700',
					passedWallet.balance.amount === 0 && 'text-gray-500'
				)}>
					{balance}
				</span>
			</div>
		</WalletCard>
	), [balance, passedWallet]);

	return (
		<WalletCardBoundaries
			pending={<CardPending />}
			error={<CardError />}
			status={status === 'pending' ? 'success' : status}
		>
			<WalletCardFx
				staleWrap={CardUnavailableWrapper}
				spoiledWrap={CardErrorWrapper}
				mutating={isMutating}
				fetchStatus={fetchStatus}
			>
				{memoizedContents}
			</WalletCardFx>
		</WalletCardBoundaries>
	);
}

export { WalletCardWithControls };