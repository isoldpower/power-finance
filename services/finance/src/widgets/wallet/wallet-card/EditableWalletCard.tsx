import {Button, cn, Icons} from "@internal/ui-library";
import { useMemo, type FC } from "react";

import {
	useWallet,
	useWalletMutationsState,
	useCardBalance,
	WalletCardFx,
	WalletCardBoundaries
} from "@feature/wallet";
import {
	CardUnavailableWrapper,
	CardErrorWrapper,
	WalletCard,
	CardPending,
	CardError
} from "@entity/wallet";
import { EditWalletModalProcess } from "@process/wallet";
import type { Wallet } from "@entity/wallet";
import { DeleteWalletModalProcess } from "@process/wallet/edit-wallet-modal/DeleteWalletModalProcess.tsx";


interface EditableWalletCardProps {
	wallet: Wallet;
}

const EditableWalletCard: FC<EditableWalletCardProps> = ({
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
						<Button type="button" variant="ghost" size="sm" color="neutral">
							<Icons.Edit size={15} />
						</Button>
					</EditWalletModalProcess>
					<DeleteWalletModalProcess wallet={passedWallet}>
						<Button type="button" variant="ghost" size="sm" className="text-red-800 dark:text-red-500">
							<Icons.Trash size={15} />
						</Button>
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

export { EditableWalletCard };