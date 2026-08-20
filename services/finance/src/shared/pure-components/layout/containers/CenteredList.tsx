import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface CenteredListProps {
	children?: ReactNode;
	direction?: "horizontal" | "vertical";
	gap?: number;
}

const CenteredList: FC<CenteredListProps> = ({ 
	children,
	gap = 3.5,
	direction = 'horizontal'
}) => {
	const listGap = useMemo<string>(() => gap.toString(), [gap]);
	
	return (
		<div 
			className={cn(
				"flex flex-wrap items-center",
				direction === "vertical" && 'flex-col',
			)} 
			style={{ gap: `calc(var(--spacing) * ${listGap})` }}
		>
			{children}
		</div>
	);
}

CenteredList.displayName = 'CenteredList';

export { CenteredList };