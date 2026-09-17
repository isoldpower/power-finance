import type { FC } from "react";


interface CalendarIconProps {
	size?: number;
	className?: string;
}

const CalendarIcon: FC<CalendarIconProps> = ({ size = 14, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<rect x="3" y="5" width="18" height="16" rx="2" />
		<path d="M3 10h18" />
		<path d="M8 3v4" />
		<path d="M16 3v4" />
	</svg>
);

CalendarIcon.displayName = 'CalendarIcon';

export { CalendarIcon };
export type { CalendarIconProps };
