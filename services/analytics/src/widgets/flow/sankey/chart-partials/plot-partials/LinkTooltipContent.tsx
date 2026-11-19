import { ChartTooltip } from "@shared/charts";
import { useAmountFormat } from "@shared/formatting";
import { Icons } from "@internal/ui-library";
import { incomeShare } from "@feature/flow";

import type { FC } from "react";
import type { PositionedLink } from "@feature/flow";


interface LinkTooltipContentProps {
	link: PositionedLink;
	color: string;
	totalInflow: number;
	currency: string;
}

const LinkTooltipContent: FC<LinkTooltipContentProps> = ({ link, color, totalInflow, currency }) => {
	const formatAmount = useAmountFormat(currency);

	return (
		<>
			<ChartTooltip.Title>
				<span className="inline-flex items-center gap-1">
					{link.source.node.label}
					<Icons.ArrowRight aria-hidden size={12} />
					{link.target.node.label}
				</span>
			</ChartTooltip.Title>
			<ChartTooltip.Row color={color} label="Amount">
				{formatAmount(link.value)}
			</ChartTooltip.Row>
			<ChartTooltip.Row label="Of income">
				{incomeShare(link.value, totalInflow)}
			</ChartTooltip.Row>
		</>
	);
};

LinkTooltipContent.displayName = 'LinkTooltipContent';

export { LinkTooltipContent };
export type { LinkTooltipContentProps };
