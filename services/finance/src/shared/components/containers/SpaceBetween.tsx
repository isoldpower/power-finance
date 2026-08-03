import type { FC, ReactNode } from "react";
import { cn } from "@internal/ui-library";


interface SpaceBetweenProps {
	children?: ReactNode
	orientation?: "horizontal" | "vertical"
}

const SpaceBetween: FC<SpaceBetweenProps> = ({ 
	children,
	orientation = 'horizontal',
}) => {
	return (
		<div className={cn(
			"flex flex-wrap items-center gap-3.5 justify-between",
			orientation === 'vertical' && 'flex-col'
		)}>
			{children}
		</div>
	);
}

SpaceBetween.displayName = 'SpaceBetween';

export { SpaceBetween };