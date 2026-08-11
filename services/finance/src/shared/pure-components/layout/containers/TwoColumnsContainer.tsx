import type { FC, ReactNode } from "react";


interface TwoColumnsContainerProps {
	children?: ReactNode
}

const TwoColumnsContainer: FC<TwoColumnsContainerProps> = ({ children }) => {
	return (
		<div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.15fr_1fr]">
			{children}
		</div>
	);
}

TwoColumnsContainer.displayName = 'TwoColumnsContainer';

export { TwoColumnsContainer };