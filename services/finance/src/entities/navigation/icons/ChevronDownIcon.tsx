import type { FC } from "react";

interface ChevronDownIconProps {
	size?: number;
	className?: string;
}

const ChevronDownIcon: FC<ChevronDownIconProps> = ({ size = 13, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<polyline points="6 9 12 15 18 9" />
	</svg>
);

ChevronDownIcon.displayName = 'ChevronDownIcon';

export { ChevronDownIcon };
export type { ChevronDownIconProps };
