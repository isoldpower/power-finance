import type { FC } from "react";

interface CheckIconProps {
	size?: number;
	className?: string;
}

const CheckIcon: FC<CheckIconProps> = ({ size = 12, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<polyline points="20 6 9 17 4 12" />
	</svg>
);

CheckIcon.displayName = 'CheckIcon';

export { CheckIcon };
export type { CheckIconProps };
