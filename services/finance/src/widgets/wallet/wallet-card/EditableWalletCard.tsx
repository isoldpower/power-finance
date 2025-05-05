import { cn, Icons } from "@internal/ui-library";
import {FC, useCallback} from "react";

import {
	useWallet,
	useWalletMutationsState,
	useCardBalance,
	DeleteWallet,
	WalletCardFx,
	useWalletSelection
} from "@feature/wallet";
import { CardUnavailable, CardError, WalletCard, CardAccessible } from "@entity/wallet";
import { EditWalletModal } from "./EditWalletModal.tsx";
import type { Wallet } from "@entity/wallet";


interface EditableWalletCardProps {
	wallet: Wallet | null;
}

const EditableWalletCard: FC<EditableWalletCardProps> = ({
	wallet: passedWallet
}) => {
	if (!passedWallet) return null;

	const { selected, setSelected } = useWalletSelection({ searchKey: 'selectedWallet' });
	const { isMutating } = useWalletMutationsState(passedWallet.id);
	const { fetchStatus } = useWallet(passedWallet.id);
	const balance = useCardBalance(passedWallet);

	const handleSelect = useCallback(() => {
		setSelected?.(selected === passedWallet.id
			? 'all'
			: passedWallet.id
		);
	}, [setSelected, passedWallet, selected]);

	return (
		<WalletCardFx
			staleWrap={CardUnavailable}
			spoiledWrap={CardError}
			defaultWrap={CardAccessible}
			mutating={isMutating}
			fetchStatus={fetchStatus}
		>
			<button
				className={cn(
					"flex flex-col w-full text-left! rounded-lg",
					selected === passedWallet.id && "outline outline-gray-600"
				)}
				onClick={handleSelect}
			>
				<WalletCard>
					<div className="flex justify-between items-start mb-3">
						<div>
							<h3 className="font-medium text-gray-900">{passedWallet.name}</h3>
							<p className="text-xs text-gray-500">
								{passedWallet.reversed ? 'Credit Account' : 'Debit Account'}
							</p>
						</div>
						<div className="flex space-x-1">
							<EditWalletModal wallet={passedWallet}>
								<Icons.Edit size={15} />
							</EditWalletModal>
							<DeleteWallet wallet={passedWallet} variant="ghost" size="sm" className="text-red-800">
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
			</button>
		</WalletCardFx>
	);
}

export { EditableWalletCard };