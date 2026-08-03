import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface EndListProps {
	children?: ReactNode;
	gap?: number;
	direction?: "horizontal" | "vertical";
}

const EndList: FC<EndListProps> = ({ 
	children,
	gap = 3.5,
	direction = 'horizontal'
}) => {
	const listGap = useMemo<string>(() => gap.toString(), [gap]);
	
	return (
		<div 
			className={cn(
				"flex flex-wrap items-end",
				direction === "vertical" && 'flex-col'
			)} 
			style={{ gap: `calc(var(--spacing) * ${listGap})` }}
		>
			{children}
		</div>
	);
}

EndList.displayName = 'EndList';

export { EndList };