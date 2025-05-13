import { cn, Icons } from "@internal/ui-library";
import { useMemo, type FC } from "react";

import {
	useWallet,
	useWalletMutationsState,
	useCardBalance,
	DeleteWallet,
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
import { EditWalletModal } from "./EditWalletModal.tsx";
import type { Wallet } from "@entity/wallet";


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
						{passedWallet.reversed ? 'Credit Account' : 'Debit Account'}
					</p>
				</div>
				<div className="flex space-x-1 [&>*]:z-20">
					<EditWalletModal wallet={passedWallet}>
						<Icons.Edit size={15} />
					</EditWalletModal>
					<DeleteWallet wallet={passedWallet} variant="ghost" size="sm" className="text-red-800 dark:text-red-500">
						<Icons.Trash size={15} />
					</DeleteWallet>
				</div>
			</div>
			<div className="mt-2">
				<span className={cn(
					'text-lg font-bold',
					(
						(passedWallet.balance < 0 && !passedWallet.reversed) ||
						(passedWallet.balance > 0 && passedWallet.reversed)
					) ? 'text-red-700' : 'text-green-700',
					passedWallet.balance === 0 && 'text-gray-500'
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