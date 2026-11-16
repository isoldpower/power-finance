import { Caption } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface InsightCardDetailProps {
	children: ReactNode;
}

const InsightCardDetail: FC<InsightCardDetailProps> = ({ children }) => (
	<Caption size="12" tone="muted">
		{children}
	</Caption>
);

InsightCardDetail.displayName = 'InsightCardDetail';

export { InsightCardDetail };
export type { InsightCardDetailProps };
