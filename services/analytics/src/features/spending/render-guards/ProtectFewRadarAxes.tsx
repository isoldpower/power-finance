import type { FC, ReactNode } from "react";


interface ProtectFewRadarAxesProps {
	axes: number;
	fallback: ReactNode;
	children: ReactNode;
}

const MIN_RADAR_AXES = 3;

const ProtectFewRadarAxes: FC<ProtectFewRadarAxesProps> = ({ axes, fallback, children }) => {
	if (axes < MIN_RADAR_AXES) {
		return fallback;
	}

	return children;
};

ProtectFewRadarAxes.displayName = 'ProtectFewRadarAxes';

export { ProtectFewRadarAxes };
export type { ProtectFewRadarAxesProps };
