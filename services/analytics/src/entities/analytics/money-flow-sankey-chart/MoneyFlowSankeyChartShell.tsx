import type { FC, ReactNode } from "react";


interface MoneyFlowSankeyChartShellProps {
	children: ReactNode;
	width: number;
	height: number;
}

const MoneyFlowSankeyChartShell: FC<MoneyFlowSankeyChartShellProps> = ({
	children,
	width,
	height
}) => {
	return (
		<svg width={width} height={height}>
			{children}
		</svg>
	);
};

MoneyFlowSankeyChartShell.displayName = 'MoneyFlowSankeyChartShell';

export { MoneyFlowSankeyChartShell };
export type { MoneyFlowSankeyChartShellProps };
