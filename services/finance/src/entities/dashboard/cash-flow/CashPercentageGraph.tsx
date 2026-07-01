import {cn} from "@internal/ui-library";

interface CashPercentageGraphProps {
	percentage: number;
	isPositive?: boolean;
}

const CashPercentageGraph = ({
	percentage,
	isPositive
}: CashPercentageGraphProps) => {
	return (
		<div
			className={cn(isPositive ? "bg-pos" : "bg-neg")}
			style={{ width: `${percentage.toFixed(1)}%` }}
		/>
	);
}

export { CashPercentageGraph };