import type { Wallet } from "@entity/wallet";


interface TransactionTargetOptions {
	target: Wallet;
}

interface TransactionTransfersProps {
	from?: TransactionTargetOptions;
	to?: TransactionTargetOptions;
}

const TransactionTargets: React.FC<TransactionTransfersProps> = ({ from, to }) => {
	return (
		<div className="flex text-xs text-silent">
			{from && (
				<span>{from.target.name}</span>
			)}
			{from && to && (
				<span className="mx-1">→</span>
			)}
			{to && (
				<span>{to.target.name}</span>
			)}
		</div>
	);
};

TransactionTargets.displayName = 'TransactionTransfers';

export { TransactionTargets };
export type { TransactionTransfersProps };