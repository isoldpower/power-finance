import { cn, FinanceCard } from "@internal/ui-library";
import { NetWorthDeltaBadge } from "./panel/NetWorthDeltaBadge.tsx";

import type { FC } from "react";
import type { FinanceCardProps } from "@internal/ui-library";
import type { NetWorthDeltaBadgeProps } from "./panel/NetWorthDeltaBadge.tsx";


type NetWorthPanelProps = FinanceCardProps;
type NetWorthPanelObject = FC<NetWorthPanelProps> & {
	DeltaBadge: FC<NetWorthDeltaBadgeProps>;
}

const NetWorthPanel: NetWorthPanelObject = ({
	children,
	className,
	...props
}) => (
	<FinanceCard className={cn("relative overflow-hidden px-6 py-[22px]", className)} {...props}>
		{children}
	</FinanceCard>
);

NetWorthPanel.DeltaBadge = NetWorthDeltaBadge;
NetWorthPanel.displayName = 'NetWorthPanel';

export { NetWorthPanel };
export type { NetWorthPanelProps };
