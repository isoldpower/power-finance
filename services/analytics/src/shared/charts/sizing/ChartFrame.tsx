import { useParentSize } from "@visx/responsive";
import { cn } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface ChartSize {
	width: number;
	height: number;
}

interface ChartFrameProps {
	height: number;
	className?: string;
	label: string;
	children: (size: ChartSize) => ReactNode;
}

const RESIZE_DEBOUNCE_MS = 60;

const ChartFrame: FC<ChartFrameProps> = ({ height, className, label, children }) => {
	const { parentRef, width } = useParentSize({ debounceTime: RESIZE_DEBOUNCE_MS, ignoreDimensions: 'height' });

	return (
		<div
			ref={parentRef}
			role="figure"
			aria-label={label}
			className={cn("relative w-full", className)}
			style={{ height }}
		>
			{width > 0 ? children({ width, height }) : null}
		</div>
	);
};

ChartFrame.displayName = 'ChartFrame';

export { ChartFrame };
export type { ChartFrameProps, ChartSize };
