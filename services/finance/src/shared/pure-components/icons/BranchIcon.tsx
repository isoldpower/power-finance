import type { FC } from "react";


interface BranchIconProps {
	size?: number;
	className?: string;
}

const BranchIcon: FC<BranchIconProps> = ({ size = 17, className }) => (
	<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
		<path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0H5a2 2 0 0 1-2-2v-4m6 6h10a2 2 0 0 0 2-2v-4" />
	</svg>
);

BranchIcon.displayName = 'BranchIcon';

export { BranchIcon };
export type { BranchIconProps };
