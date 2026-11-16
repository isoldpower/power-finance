import { Overline } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartCardTitleProps {
	children: ReactNode;
}

const ChartCardTitle: FC<ChartCardTitleProps> = ({ children }) => (
	<Overline as="h2" tracking="0.14em">
		{children}
	</Overline>
);

ChartCardTitle.displayName = 'ChartCardTitle';

export { ChartCardTitle };
export type { ChartCardTitleProps };
