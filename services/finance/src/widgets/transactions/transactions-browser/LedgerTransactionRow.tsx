import { useMemo } from "react";
import { cn, FinanceBadge } from "@internal/ui-library";

import {
	AmountDirectionIcon,
	directionIconClass,
	toneByDirection,
	toneTextClass,
	toTransactionMoneyView,
	toTransactionRowView,
} from "@entity/transactions";
import { useConvertMoney } from "@feature/localization";
import { useLocaleCurrency } from "@shared/utils";

import type { FC } from "react";
import type { TransactionPreviewDto } from "@entity/transactions";


interface LedgerTransactionRowProps {
	transaction: TransactionPreviewDto;
	expanded: boolean;
	onToggle: () => void;
}

const LedgerTransactionRow: FC<LedgerTransactionRowProps> = ({
	transaction,
	expanded,
	onToggle,
}) => {
	const { convert } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const row = useMemo(() => toTransactionRowView(transaction, formatCurrency), [transaction, formatCurrency]);
	const money = useMemo(() => toTransactionMoneyView(transaction, convert, formatCurrency), [transaction, convert, formatCurrency]);
	const tone = toneByDirection[row.direction];

	return (
		<div onClick={onToggle} className={cn(
			"flex h-14 cursor-pointer items-center px-4",
			!expanded && "hover:bg-secondary"
		)}>
			<div className="w-[74px] font-numeric">
				<div className="text-xs">{row.date}</div>
				<div className="text-[10px] text-text-3">{row.time}</div>
			</div>
			<div className="flex min-w-0 flex-1 items-center gap-2.5">
				<div className={cn("flex size-[30px] flex-none items-center justify-center rounded-[8px]", directionIconClass[row.direction])}>
					<AmountDirectionIcon direction={row.direction} />
				</div>
				<div className="min-w-0">
					<div className="truncate text-[13.5px] font-semibold">{row.kind}</div>
				</div>
			</div>
			<div className="hidden w-[130px] text-[12.5px] text-text-2 md:block">{row.walletName}</div>
			<div className="hidden w-[108px] md:block">
				<FinanceBadge tone="neutral" appearance="outline" size="sm">{row.category}</FinanceBadge>
			</div>
			<div className={cn("w-[104px] text-right font-numeric text-[12px]", toneTextClass[tone])}>{money.amountOriginal}</div>
			<div className="hidden w-[104px] text-right font-numeric text-[12px] md:block">
				{money.converted ? <span className={toneTextClass[tone]}>{money.amountMain}</span> : <span className="text-text-3">—</span>}
			</div>
			<div className="w-[26px] text-right">
				<span className={cn("inline-block text-[11px] text-text-3 transition-transform", expanded && "rotate-180")}>▾</span>
			</div>
		</div>
	);
};

LedgerTransactionRow.displayName = 'LedgerTransactionRow';

export { LedgerTransactionRow };
export type { LedgerTransactionRowProps };
