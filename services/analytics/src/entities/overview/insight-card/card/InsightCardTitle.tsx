import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface InsightCardTitleProps {
	children: ReactNode;
}

const InsightCardTitle: FC<InsightCardTitleProps> = ({ children }) => (
	<Text as="h3" size="13.5" weight="semibold">
		{children}
	</Text>
);

InsightCardTitle.displayName = 'InsightCardTitle';

export { InsightCardTitle };
export type { InsightCardTitleProps };
