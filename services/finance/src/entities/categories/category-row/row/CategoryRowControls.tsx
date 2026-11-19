import type { FC, ReactNode } from "react";


interface CategoryRowControlsProps {
	children: ReactNode;
}

const CategoryRowControls: FC<CategoryRowControlsProps> = ({ children }) => (
	<div className="flex flex-none items-center gap-1.5">
		{children}
	</div>
);

CategoryRowControls.displayName = 'CategoryRowControls';

export { CategoryRowControls };
export type { CategoryRowControlsProps };
