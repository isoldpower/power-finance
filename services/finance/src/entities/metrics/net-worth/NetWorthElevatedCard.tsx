import { cn, FinanceCard } from "@internal/ui-library";

import { FinanceCardProps } from "@internal/ui-library";
import { FC } from "react";


const NetWorthElevatedCard: FC<FinanceCardProps> = ({ className, children, ...props }) => (
	<FinanceCard className={cn("relative overflow-hidden px-6 py-[22px]", className)} {...props}>
		{children}
	</FinanceCard>
);

export { NetWorthElevatedCard };