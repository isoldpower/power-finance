import { cn, FinanceComboboxTrigger } from "@internal/ui-library";

import type { FC } from "react";


interface RuleValueTriggerProps {
	label: string;
	unset: boolean;
	ariaLabel: string;
	className?: string;
	disabled?: boolean;
}

const RuleValueTrigger: FC<RuleValueTriggerProps> = ({
	label,
	unset,
	ariaLabel,
	className,
	disabled,
}) => (
	<FinanceComboboxTrigger
		aria-label={ariaLabel}
		disabled={disabled}
		className={cn(
			"h-10 w-full rounded-[var(--radius-md)] bg-transparent px-3.5 text-[12px] font-normal",
			unset && "text-text-3",
			className
		)}
	>
		<span className="truncate" title={label}>{label}</span>
	</FinanceComboboxTrigger>
);

RuleValueTrigger.displayName = 'RuleValueTrigger';

export { RuleValueTrigger };
export type { RuleValueTriggerProps };
