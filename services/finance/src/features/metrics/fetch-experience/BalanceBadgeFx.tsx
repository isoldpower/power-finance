import { FinanceBadge } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


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