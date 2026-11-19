import { useMemo } from "react";

import type { FC } from "react";


interface KpiTileSparklineProps {
	id: string;
	line: string;
	area: string;
	color: string;
	width: number;
	height: number;
}

const KpiTileSparkline: FC<KpiTileSparklineProps> = ({ id, line, area, color, width, height }) => {
	const viewBox = useMemo(() => {
		return `0 0 ${width.toString()} ${height.toString()}`;
	}, [width, height]);

	const areaFill = useMemo(() => {
		return `url(#${id})`;
	}, [id]);

	return (
		<svg
			aria-hidden
			viewBox={viewBox}
			preserveAspectRatio="none"
			className="fx-reveal-x mt-1 block h-8 w-full overflow-visible"
		>
			<defs>
				<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor={color} stopOpacity="0.22" />
					<stop offset="100%" stopColor={color} stopOpacity="0" />
				</linearGradient>
			</defs>
			<path d={area} fill={areaFill} className="fx-fade" />
			<path
				d={line}
				fill="none"
				stroke={color}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
	);
};

KpiTileSparkline.displayName = 'KpiTileSparkline';

export { KpiTileSparkline };
export type { KpiTileSparklineProps };
