import { Caption } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartCardCaptionProps {
	children: ReactNode;
}

const ChartCardCaption: FC<ChartCardCaptionProps> = ({ children }) => (
	<Caption size="12.5" className="mt-1">
		{children}
	</Caption>
);

ChartCardCaption.displayName = 'ChartCardCaption';

export { ChartCardCaption };
export type { ChartCardCaptionProps };
