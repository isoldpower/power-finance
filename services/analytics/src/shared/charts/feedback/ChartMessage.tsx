import { cn } from "@internal/ui-library";
import { Caption, Text } from "@internal/shared";

import type { FC } from "react";


interface ChartMessageProps {
	height: number;
	title: string;
	detail?: string;
}

const ChartMessage: FC<ChartMessageProps> = ({ height, title, detail }) => (
	<div
		className={cn(
			"flex w-full flex-col items-center justify-center gap-1 text-center",
			"rounded-[var(--radius-md)] border border-dashed border-border",
		)}
		style={{ height }}
	>
		<Text size="13" weight="semibold" tone="muted">
			{title}
		</Text>
		{detail ? (
			<Caption size="12">
				{detail}
			</Caption>
		) : null}
	</div>
);

ChartMessage.displayName = 'ChartMessage';

export { ChartMessage };
export type { ChartMessageProps };
