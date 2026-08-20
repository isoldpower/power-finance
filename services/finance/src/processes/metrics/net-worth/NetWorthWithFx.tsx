import { ConvertedNetWorth, ConvertedNetWorthChart, MetricPeriodTitle } from "@widget/metrics";
import { useNetWorth, NetWorthHeroFx, useMetricsPreferences } from "@feature/metrics";
import { NetWorthPanel, periodSince } from "@entity/metrics";

import type { FC } from "react";


interface NetWorthHeroWithFxProps {
	className?: string;
}

const NetWorthHeroWithFx: FC<NetWorthHeroWithFxProps> = ({
	className,
}) => {
	const period = useMetricsPreferences((state) => state.metricsPeriod);
	const { netWorth, isPending, isError } = useNetWorth({ since: periodSince(period) });

	return (
		<NetWorthPanel className={className}>
			<div className="relative">
				<MetricPeriodTitle label="Net worth change" period={period} relative />
				<NetWorthHeroFx isPending={isPending} isError={isError} netWorth={netWorth}>
					{(netWorth) => (
						<div className='mt-6'>
							<ConvertedNetWorth netWorth={netWorth} />
							<ConvertedNetWorthChart netWorth={netWorth} />
						</div>
					)}
				</NetWorthHeroFx>
			</div>
		</NetWorthPanel>
	);
};

export { NetWorthHeroWithFx };