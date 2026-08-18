import { FinanceBadge } from "@internal/ui-library";

import type { ReactNode, FC } from "react";


interface ExplanatoryNeutralBadgeProps {
	children?: ReactNode
}

const ExplanatoryNeutralBadge: FC<ExplanatoryNeutralBadgeProps> = ({ 
	children,
}) => {
	return (
		<FinanceBadge tone="neutral" appearance="outline" size="sm">
			{children}
		</FinanceBadge>	
	);
}

ExplanatoryNeutralBadge.displayName = 'ExplanatoryNeutralBadge';

export { ExplanatoryNeutralBadge };
export type { ExplanatoryNeutralBadgeProps };