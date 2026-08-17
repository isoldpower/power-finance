import { cn } from "@internal/ui-library";
import { Text } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type NeedsActionHeaderBadgeProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLSpanElement>, 'className'>>;

const NeedsActionHeaderBadge: FC<NeedsActionHeaderBadgeProps> = ({
	children,
	...props
}) => (
	<Text
		size="11.5"
		weight="semibold"
		tone="inverted"
		className={cn(
			"inline-flex items-center rounded-full bg-primary px-2.5 py-0.5"
		)}
		{...props}
	>
		{children}
	</Text>
);

NeedsActionHeaderBadge.displayName = 'NeedsActionHeaderBadge';

export { NeedsActionHeaderBadge };
export type { NeedsActionHeaderBadgeProps };
