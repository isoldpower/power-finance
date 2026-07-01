import type { Period } from "@entity/dashboard";
import type { FC } from "react";

import { useInsights } from "@feature/summary";
import { NetWorthHeroFx } from "@feature/metrics/fetch-experience/NetWorthHeroFx.tsx";
import { cn, FinanceCard } from "@internal/ui-library";
import { ConvertedNetWorth } from "@widget/dashboard/net-worth/ConvertedNetWorth.tsx";
import { ConvertedNetWorthChart } from "@widget/dashboard/net-worth/ConvertedNetWorthChart.tsx";

interface NetWorthHeroWithFxProps {
	period: Period;
	className?: string;
}

const NetWorthHeroWithFx: FC<NetWorthHeroWithFxProps> = ({
	period,
	className,
}) => {
	const { netWorth, isPending, isError } = useInsights({
		metrics: ['net_worth'],
		range: period,
	});

	return (
		<FinanceCard className={cn("relative overflow-hidden px-6 py-[22px]", className)}>
			<div className="relative">
				<div className="font-numeric text-[11px] uppercase tracking-[0.14em] text-text-3">
					Total net worth
				</div>
				<NetWorthHeroFx isPending={isPending} isError={isError} netWorth={netWorth}>
					{(netWorth) => (
						<>
							<ConvertedNetWorth
								netWorth={netWorth}
								period={period} />
							<ConvertedNetWorthChart
								netWorth={netWorth} />
						</>
					)}
				</NetWorthHeroFx>
			</div>
		</FinanceCard>
	);
};

export { NetWorthHeroWithFx };