import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";
import type { Severity } from "../../types.ts";


type NeedsActionRowIconProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'> & {
	severity?: Severity;
}>;

const NeedsActionRowIcon: FC<NeedsActionRowIconProps> = ({
	children,
	severity = 'info',
	...props
}) => (
	<Text
		as="div"
		size="15"
		weight="semibold"
		className={cn(
			"flex size-[34px] flex-none items-center justify-center rounded-[9px]",
			severity === "critical" && "bg-[var(--neg-soft)] text-neg",
			severity === "warning" && "bg-[var(--warn-soft)] text-warn",
			severity === "info" && "bg-[var(--accent-soft)] text-primary"
		)}
		{...props}
	>
		{children}
	</Text>
);

NeedsActionRowIcon.displayName = 'NeedsActionRowIcon';

export { NeedsActionRowIcon };
export type { NeedsActionRowIconProps };
