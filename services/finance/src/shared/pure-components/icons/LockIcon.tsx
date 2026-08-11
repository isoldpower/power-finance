import type { FC } from "react";


interface LockIconProps {
	size?: number;
	className?: string;
}

const LockIcon: FC<LockIconProps> = ({ size = 15, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<rect x="3" y="11" width="18" height="11" rx="2" />
		<path d="M7 11V7a5 5 0 0 1 10 0v4" />
	</svg>
);

LockIcon.displayName = 'LockIcon';

export { LockIcon };
export type { LockIconProps };
