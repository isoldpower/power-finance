import type { FC } from "react";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { getFinanceRoute } from "@internal/shared";
import { cn, FinanceCard, FinanceMoney } from "@internal/ui-library";

import { useTransactionsList, getMonthGroupedTransactions } from "@feature/transaction";
import { useWalletsList } from "@feature/wallet";
import { useConvertMoney } from "@feature/fx";
import { toTransactionRow } from "@widget/management/adapters";
import { useLocaleCurrency } from "@shared/utils";

interface RecentActivityPanelProps {
	className?: string;
}

const RecentActivityPanel: FC<RecentActivityPanelProps> = ({ className }) => {
	const { transactions, isPending } = useTransactionsList();
	const { wallets } = useWalletsList();
	const { convert, targetCurrency } = useConvertMoney();
	const formatCurrency = useLocaleCurrency();

	const walletById = useMemo(
		() => new Map(wallets.map((wallet) => [wallet.id, { name: wallet.name, currency: wallet.balance.currency }])),
		[wallets]
	);

	const groups = useMemo(() => {
		const grouped = getMonthGroupedTransactions(transactions);
		return Object.entries(grouped)
			.sort(([a], [b]) => Date.parse(b) - Date.parse(a))
			.slice(0, 2)
			.map(([date, items]) => {
				const rows = [...items]
					.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at))
					.map((item) => toTransactionRow(item, walletById, formatCurrency));
				// Sum in the display currency — rows can come from wallets of differing currencies.
				const sum = rows.reduce((total, row) => total + convert({ amount: row.amount, currency: row.currency }).amount, 0);
				return {
					label: new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }),
					sum,
					rows,
				};
			});
	}, [transactions, walletById, formatCurrency, convert]);

	return (
		<FinanceCard className={cn("overflow-hidden", className)}>
			<div className="flex items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Recent activity</span>
				<div className="flex-1" />
				<Link to={getFinanceRoute('management')} className="text-[12.5px] font-semibold text-primary hover:underline">
					View all in Management →
				</Link>
			</div>

			{isPending ? (
				<div className="px-[18px] py-8 text-center text-[13px] text-text-3">Loading…</div>
			) : groups.length === 0 ? (
				<div className="px-[18px] py-8 text-center text-[13px] text-text-3">No recent activity.</div>
			) : (
				groups.map((group) => (
					<div key={group.label}>
						<div className="flex items-center justify-between border-b border-border bg-secondary px-[18px] py-2.5">
							<span className="font-numeric text-[10px] uppercase tracking-[0.1em] text-text-3">{group.label}</span>
							<FinanceMoney tone={group.sum >= 0 ? 'pos' : 'neg'} size="sm">
								{formatCurrency(group.sum, targetCurrency)}
							</FinanceMoney>
						</div>
						{group.rows.map((row) => (
							<div key={row.id} className="flex cursor-pointer items-center gap-3 border-b border-border px-[18px] py-2.5 last:border-b-0 hover:bg-secondary">
								<div className={`flex size-8 flex-none items-center justify-center rounded-[8px] ${row.iconClass}`}>{row.icon}</div>
								<div className="min-w-0 flex-1">
									<div className="text-[13.5px] font-semibold">{row.walletName}</div>
									<div className="flex items-center gap-1.5 text-[11.5px] text-text-3">
										<span>{row.category}</span>
										<span className="size-[3px] rounded-full bg-text-3" />
										<span>{row.time}</span>
									</div>
								</div>
								<div className="text-right">
									<FinanceMoney tone={row.tone} size="sm" className="block">
										{convert({ amount: row.amount, currency: row.currency }).formatted}
									</FinanceMoney>
									<div className="font-numeric text-[10.5px] text-text-3">{row.date}</div>
								</div>
							</div>
						))}
					</div>
				))
			)}
		</FinanceCard>
	);
};

RecentActivityPanel.displayName = 'RecentActivityPanel';

export { RecentActivityPanel };
