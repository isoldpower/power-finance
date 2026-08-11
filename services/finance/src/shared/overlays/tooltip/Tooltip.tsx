import type { FC, ReactNode } from "react";
import { FinanceTooltip } from "@internal/ui-library";


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
