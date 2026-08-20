import { cn } from "@internal/ui-library";

import { Text } from "@shared/pure-components/typography";

import type { FC } from "react";


interface AiBadgeProps {
	className?: string;
}

const AiBadge: FC<AiBadgeProps> = ({ className }) => (
	<Text
		family="numeric"
		size="9"
		weight="semibold"
		tone="inverted"
		className={cn("rounded-[4px] bg-primary px-1.5 py-0.5", className)}
	>
		AI
	</Text>
);

AiBadge.displayName = 'AiBadge';

export { AiBadge };
export type { AiBadgeProps };
