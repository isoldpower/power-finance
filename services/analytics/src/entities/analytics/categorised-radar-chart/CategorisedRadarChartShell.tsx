import { Group } from "@visx/group";
import { useMemo, type FC, type ReactNode } from "react";

interface CategorisedRadarChartShellProps {
	width: number;
	height: number;
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
	children: ReactNode;
}

const CategorisedRadarChartShell: FC<CategorisedRadarChartShellProps> = ({
	width,
	height,
	margin,
	children
}) => {
    const innerWidth = useMemo(() => width - margin.left - margin.right, [margin.left, margin.right, width]);
    const innerHeight = useMemo(() => height - margin.top - margin.bottom, [height, margin.bottom, margin.top]);

	const centerY = useMemo(() => innerHeight / 2, [innerHeight]);
	const centerX = useMemo(() => innerWidth / 2, [innerWidth]);

	return (
		<svg width={width} height={height}>
			<Group top={centerY + margin.top} left={centerX + margin.left}>
				{ children }
			</Group>
		</svg>
	)
}

export { CategorisedRadarChartShell };
export type { CategorisedRadarChartShellProps };