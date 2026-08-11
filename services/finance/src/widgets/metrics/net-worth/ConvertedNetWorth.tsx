import { FinanceMoney } from "@internal/ui-library";
import { AnimatedMoney } from "@entity/localization";
import { MetricCardDescriptor, NetWorthDeltaBadge } from "@entity/metrics";
import { BodyText, textClass } from "@shared/pure-components/typography";
import { useConvertedNetWorth, useConvertedNetDiff } from "@feature/metrics";

import type { FC } from "react";
import type { NetWorthInsight } from "@feature/metrics";


interface ConvertedNetWorthProps {
	netWorth: NetWorthInsight
}

const ConvertedNetWorth: FC<ConvertedNetWorthProps> = ({ netWorth }) => {
	const { netWorthDiff, convertedNetWorth } = useConvertedNetWorth(netWorth);
	const { netDiffConverted, netDiffSign } = useConvertedNetDiff(netWorth);

	return (
		<>
			<div className="mt-2.5 flex items-end gap-3.5">
				<FinanceMoney
					size="display"
					className={textClass({ size: '42', leading: '0.95' })}
					style={{ fontVariantNumeric: 'normal' }}
				>
					{netDiffSign}
					<AnimatedMoney
						amount={netDiffConverted.amount}
						currency={netDiffConverted.currency}
						bare
					/>
				</FinanceMoney>
				<NetWorthDeltaBadge netDiffSign={netDiffSign}>
					{netDiffSign}{Math.abs(netWorthDiff.pct)}%
				</NetWorthDeltaBadge>
			</div>
			<MetricCardDescriptor>
				<BodyText as="span" tone={netWorthDiff.direction === 'up' ? 'positive' : 'negative'}>
					{convertedNetWorth.formatted}
				</BodyText>
				&nbsp;since start
			</MetricCardDescriptor>
		</>
	);
};

export { ConvertedNetWorth };
