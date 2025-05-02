import { Icons } from "@internal/ui-library";
import { TransactionTarget } from "./TransactionTarget.tsx";
import type { TransactionTargetOptions } from "./TransactionTarget.tsx";


interface TransactionTransfersProps {
	from?: TransactionTargetOptions;
	to?: TransactionTargetOptions;
}

const TransactionTargets: React.FC<TransactionTransfersProps> = ({ from, to }) => {
	return (
		<div className="flex items-center w-full text-xs text-gray-500 gap-4">
			{from && (
				<TransactionTarget receiver={false} target={from} />
			)}
			{from && to && <span className="mx-1 flex justify-center">
				<Icons.CircleArrowRight className="w-6 h-6 text-gray-500" />
			</span>}
			{to && (
				<TransactionTarget receiver target={to} />
			)}
		</div>
	);
};

TransactionTargets.displayName = 'TransactionTransfers';

export { TransactionTargets };
export type { TransactionTransfersProps };