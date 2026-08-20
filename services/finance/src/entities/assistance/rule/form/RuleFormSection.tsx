import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type RuleFormSectionProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const RuleFormSection: FC<RuleFormSectionProps> = ({
	children,
	...props
}) => (
	<div
		className={cn(
			"mb-4 flex flex-col"
		)}
		{...props}
	>
		{children}
	</div>
);

RuleFormSection.displayName = 'RuleFormSection';

export { RuleFormSection };
export type { RuleFormSectionProps };
