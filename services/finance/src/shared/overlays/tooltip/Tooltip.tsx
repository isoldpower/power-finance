import { FinanceTooltip } from "@internal/ui-library";

import type { FC, ReactNode } from "react";


interface TooltipProps {
	content: ReactNode;
	children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ content, children }) => (
	<FinanceTooltip content={content}>
		<div className="cursor-help">
			{children}
		</div>
	</FinanceTooltip>
);

Tooltip.displayName = 'Tooltip';

export { Tooltip };
export type { TooltipProps };
