import { cn } from "@internal/ui-library";
import { DrillDownHeaderRule } from "./header/DrillDownHeaderRule.tsx";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { DrillDownHeaderRuleProps } from "./header/DrillDownHeaderRule.tsx";


type DrillDownHeaderProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;
type DrillDownHeaderObject = FC<DrillDownHeaderProps> & {
	Rule: FC<DrillDownHeaderRuleProps>;
}

const DrillDownHeader: DrillDownHeaderObject = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mx-0.5 mb-2.5 flex items-center gap-2.5"
		)}
		{...props}
	>
		{children}
	</div>
);

DrillDownHeader.Rule = DrillDownHeaderRule;
DrillDownHeader.displayName = 'DrillDownHeader';

export { DrillDownHeader };
export type { DrillDownHeaderProps };
