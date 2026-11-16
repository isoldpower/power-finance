import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface ChartCardBodyProps {
	className?: string;
	children: ReactNode;
}

const ChartCardBody: FC<ChartCardBodyProps> = ({ className, children }) => (
	<div className={cn("relative min-h-0 flex-1", className)}>
		{children}
	</div>
);

ChartCardBody.displayName = 'ChartCardBody';

export { ChartCardBody };
export type { ChartCardBodyProps };
