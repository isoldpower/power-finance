import {cn} from "@internal/ui-library";

import type { ComponentProps } from "react";


type CashPercentageGraphProps = ComponentProps<"div"> & {
	percentage: number;
	isPositive?: boolean;
}

const CashPercentageGraph = ({
	percentage,
	isPositive,
	className,
	style,
	...props
}: CashPercentageGraphProps) => {
	return (
		<div
			className={cn(isPositive ? "bg-pos" : "bg-neg", className)}
			style={{ width: `${percentage.toFixed(1)}%`, ...style }}
			{...props}
		/>
	);
}

CashPercentageGraph.displayName = 'CashPercentageGraph';

export { CashPercentageGraph };
export type { CashPercentageGraphProps };
