import type { FC } from "react";

interface SparkleIconProps {
	size: number;
	accent?: boolean;
}

const SparkleIcon: FC<SparkleIconProps> = ({ size, accent = false }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill={accent ? "var(--primary)" : "#fff"}>
		<path d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6L12 2z" />
	</svg>
);

SparkleIcon.displayName = 'SparkleIcon';

export { SparkleIcon };
export type { SparkleIconProps };
