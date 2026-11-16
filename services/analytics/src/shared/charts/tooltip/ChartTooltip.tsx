import { TooltipWithBounds } from "@visx/tooltip";
import { cn } from "@internal/ui-library";
import { ChartTooltipRow } from "./parts/ChartTooltipRow.tsx";
import { ChartTooltipTitle } from "./parts/ChartTooltipTitle.tsx";

import type { FC, ReactNode } from "react";
import type { ChartTooltipRowProps } from "./parts/ChartTooltipRow.tsx";
import type { ChartTooltipTitleProps } from "./parts/ChartTooltipTitle.tsx";


interface ChartTooltipProps {
	top: number;
	left: number;
	children: ReactNode;
}

type ChartTooltipObject = FC<ChartTooltipProps> & {
	Row: FC<ChartTooltipRowProps>;
	Title: FC<ChartTooltipTitleProps>;
};

const TOOLTIP_OFFSET = 14;

const ChartTooltip: ChartTooltipObject = ({ top, left, children }) => (
	<TooltipWithBounds
		top={top}
		left={left}
		offsetLeft={TOOLTIP_OFFSET}
		offsetTop={TOOLTIP_OFFSET}
		unstyled
		applyPositionStyle
		className="pointer-events-none z-20"
	>
		<div
			className={cn(
				"fx-drop min-w-[168px] rounded-[10px] bg-[var(--text)] px-3 py-2.5",
				"text-[var(--surface)] shadow-[var(--shadow-lg)]",
			)}
		>
			{children}
		</div>
	</TooltipWithBounds>
);

ChartTooltip.Row = ChartTooltipRow;
ChartTooltip.Title = ChartTooltipTitle;
ChartTooltip.displayName = 'ChartTooltip';

export { ChartTooltip };
export type { ChartTooltipProps };
