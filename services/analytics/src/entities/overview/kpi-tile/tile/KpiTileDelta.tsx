import { FinanceBadge } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


type KpiDeltaTone = 'pos' | 'neg' | 'neutral';

interface KpiTileDeltaProps {
	tone: KpiDeltaTone;
	children: ReactNode;
}

const KpiTileDelta: FC<KpiTileDeltaProps> = ({ tone, children }) => (
	<FinanceBadge tone={tone} size="sm" className="font-numeric">
		{children}
	</FinanceBadge>
);

KpiTileDelta.displayName = 'KpiTileDelta';

export { KpiTileDelta };
export type { KpiDeltaTone, KpiTileDeltaProps };
