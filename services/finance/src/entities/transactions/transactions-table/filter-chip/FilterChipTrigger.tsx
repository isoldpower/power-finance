import { cn, FinanceMenuTrigger } from "@internal/ui-library";
import { textClass } from "@shared/pure-components/typography";

import type { FC, PropsWithChildren } from "react";


type FilterChipTriggerProps = PropsWithChildren<{
	active: boolean;
}>;

const FilterChipTrigger: FC<FilterChipTriggerProps> = ({ children, active }) => (
	<FinanceMenuTrigger asChild>
		<button
			type="button"
			className={cn(
				textClass({ size: 'xs', weight: 'semibold' }),
				"flex items-center gap-1.5 rounded-[var(--radius-md)] border px-3 py-2",
				active
					? "border-[var(--accent-border)] bg-[var(--accent-soft)] text-primary"
					: "border-border-strong text-text-2"
			)}
		>
			{children}
		</button>
	</FinanceMenuTrigger>
);

FilterChipTrigger.displayName = 'FilterChipTrigger';

export { FilterChipTrigger };
export type { FilterChipTriggerProps };
