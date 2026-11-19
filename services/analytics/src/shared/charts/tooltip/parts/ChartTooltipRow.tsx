import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartTooltipRowProps {
	color?: string;
	label: ReactNode;
	children: ReactNode;
}

const ChartTooltipRow: FC<ChartTooltipRowProps> = ({ color, label, children }) => (
	<Text as="div" size="12" className="flex items-center gap-2 py-[1px]">
		{color && (
			<span className="size-2 shrink-0 rounded-full" style={{ background: color }} />
		)}
		<span className="min-w-0 flex-1 truncate opacity-80">
			{label}
		</span>
		<Text family="numeric" weight="semibold">
			{children}
		</Text>
	</Text>
);

ChartTooltipRow.displayName = 'ChartTooltipRow';

export { ChartTooltipRow };
export type { ChartTooltipRowProps };
