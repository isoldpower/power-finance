import { cn } from "@internal/ui-library";
import { useSettingsContext } from "@internal/shared";

interface TransferSide {
	target: string;
	amount: number;
	currency: string;
}

interface TransactionTransfersProps {
	from?: TransferSide;
	to?: TransferSide;
}

const TransactionTargets: React.FC<TransactionTransfersProps> = ({ from, to }) => {
	const { locale } = useSettingsContext();
	const formatValue = (value: TransferSide) => {
		return value.amount.toLocaleString(locale, {
			style: 'currency',
			currency: value.currency,
		});
	}

	return (
		<div className="flex items-center text-xs text-gray-500 mt-1 gap-2">
			{from && (
				<div className="flex flex-col gap-2">
					<h4 className="text-lg">{from.target}</h4>
					<span className={cn(from.amount > 0 ? 'text-red-500' : 'text-green-500')}>
						{from.amount > 0 ? '-' : '+'}
						{formatValue(from)}
					</span>
				</div>
			)}
			{from && to && <span className="mx-1">→</span>}
			{to && (
				<div className="flex flex-col gap-2">
					<h4 className="text-lg">{to.target}</h4>
					<span className={cn(to.amount > 0 ? 'text-green-500' : 'text-red-500')}>
						{to.amount > 0 ? '+' : '-'}
						{formatValue(to)}
					</span>
				</div>
			)}
		</div>
	);
};

TransactionTargets.displayName = 'TransactionTransfers';

export { TransactionTargets };
export type { TransactionTransfersProps };