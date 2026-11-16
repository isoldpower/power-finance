import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartTooltipTitleProps {
	children: ReactNode;
}

const ChartTooltipTitle: FC<ChartTooltipTitleProps> = ({ children }) => (
	<Text as="div" size="11" weight="semibold" className="mb-1.5 opacity-70">
		{children}
	</Text>
);

ChartTooltipTitle.displayName = 'ChartTooltipTitle';

export { ChartTooltipTitle };
export type { ChartTooltipTitleProps };
