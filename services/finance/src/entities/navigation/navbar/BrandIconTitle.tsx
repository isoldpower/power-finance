import type { FC, ReactNode } from "react";


interface BrandIconTitleProps {
	children: ReactNode;
}

const BrandIconTitle: FC<BrandIconTitleProps> = ({ children }) => (
	<span className="font-display text-base font-semibold tracking-[-0.01em]">
		{children}
	</span>
);

BrandIconTitle.displayName = 'BrandIconTitle';

export { BrandIconTitle };