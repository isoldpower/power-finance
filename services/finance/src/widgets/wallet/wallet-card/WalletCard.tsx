import type { Wallet } from "@entity/wallet";
import { cn, Icons } from "@internal/ui-library";
import {useWallet} from "@feature/wallet";
import {useCardBalance} from "@feature/wallet/total-balance/useCardBalance.ts";
import {EditWallet} from "@feature/wallet/edit-wallet/EditWallet.tsx";
import {DeleteWallet} from "@feature/wallet/delete-wallet/DeleteWallet.tsx";

interface WalletCardProps {
	wallet: Wallet;
}

const WalletCard: React.FC<WalletCardProps> = ({
	wallet: passedWallet,
}) => {
	const { query } = useWallet(passedWallet.id);
	const balance = useCardBalance(passedWallet);

	return (
		<div className={cn(
        'border rounded-lg p-4 cursor-pointer transition-all duration-200 shadow-sm',
				query.isFetching ? 'opacity-50' : 'hover:shadow-lg',
			)}
		>
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="font-medium text-gray-900">{passedWallet.name}</h3>
					<p className="text-xs text-gray-500">
						{passedWallet.reversed ? 'Credit Account' : 'Debit Account'}
					</p>
				</div>
				<div className="flex space-x-1">
					<EditWallet wallet={passedWallet} variant="ghost" size="sm" color="neutral">
						<Icons.Edit size={15} />
					</EditWallet>
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
				)}>
          {balance}
        </span>
			</div>
		</div>
	);
};

export default WalletCard;