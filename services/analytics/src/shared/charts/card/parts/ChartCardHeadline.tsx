import { DisplayText } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartCardHeadlineProps {
	children: ReactNode;
}

const ChartCardHeadline: FC<ChartCardHeadlineProps> = ({ children }) => (
	<DisplayText size="26" leading="1.1" className="mt-2">
		{children}
	</DisplayText>
);

ChartCardHeadline.displayName = 'ChartCardHeadline';

export { ChartCardHeadline };
export type { ChartCardHeadlineProps };
