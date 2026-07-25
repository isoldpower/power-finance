import type { FC, ReactNode } from "react";

import { FinanceBadge } from "@internal/ui-library";


interface BalanceBadgeFxProps {
	isPending: boolean;
	children: ReactNode;
}

const BalanceBadgeFx: FC<BalanceBadgeFxProps> = ({
   isPending,
   children,
}) => {
	if (isPending) {
		return (
			<FinanceBadge tone="neutral" appearance="soft" dot>
				evaluating
			</FinanceBadge>
		)
	}

	return children;
};

export { BalanceBadgeFx };