import * as React from "react";

import { cn } from "@/utils";
import { FinanceCard } from "./FinanceCard.tsx";
import { FinanceStat } from "./FinanceStat.tsx";
import { FinanceBadge } from "./FinanceBadge.tsx";


type FinanceWalletCardProps = React.ComponentProps<typeof FinanceCard> & {
	name: React.ReactNode;
	type?: React.ReactNode;
	balance: React.ReactNode;
	pinned?: boolean;
	updatedAgo?: React.ReactNode;
	gradient?: string;
};

function FinanceWalletCard({
	className,
	name,
	type,
	balance,
	pinned = false,
	updatedAgo,
	gradient,
	...props
}: FinanceWalletCardProps) {
	return (
		<FinanceCard className={cn("flex flex-col gap-3.5 p-[18px]", className)} {...props}>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2.5">
					<span
						className="h-6 w-[34px] flex-none rounded-[3px]"
						style={{ background: gradient ?? "linear-gradient(135deg, var(--accent), var(--accent-border))" }}
					/>
					<div className="min-w-0">
						<div className="text-sm font-semibold">{name}</div>
						{type ? <div className="text-[11.5px] text-text-3">{type}</div> : null}
					</div>
				</div>
				{pinned ? (
					<FinanceBadge tone="accent" size="sm">
						Pinned
					</FinanceBadge>
				) : null}
			</div>
			<FinanceStat size="lg" label="Balance">
				{balance}
			</FinanceStat>
			{updatedAgo ? (
				<div className="border-t border-border pt-2.5 text-[11.5px] text-text-3">
					{updatedAgo}
				</div>
			) : null}
		</FinanceCard>
	);
}

export { FinanceWalletCard };
export type { FinanceWalletCardProps };
