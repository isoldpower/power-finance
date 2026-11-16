import { cn } from "@internal/ui-library";
import { Text } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface ChartLegendItemProps {
	color: string;
	label: ReactNode;
	value?: ReactNode;
	muted?: boolean;
	onToggle?: () => void;
	onHover?: (hovered: boolean) => void;
}

const ChartLegendItem: FC<ChartLegendItemProps> = ({ color, label, value, muted = false, onToggle, onHover }) => (
	<li>
		<button
			type="button"
			aria-pressed={!muted}
			disabled={onToggle === undefined}
			onClick={onToggle}
			onMouseEnter={() => { onHover?.(true); }}
			onMouseLeave={() => { onHover?.(false); }}
			className={cn(
				"flex items-center gap-1.5 rounded-full px-2 py-1 transition-[opacity,background-color]",
				"enabled:cursor-pointer enabled:hover:bg-secondary disabled:cursor-default",
				muted && "opacity-40",
			)}
		>
			<span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: color }} />
			<Text size="12" weight="medium" tone="muted">
				{label}
			</Text>
			{value === undefined ? null : (
				<Text size="12" family="numeric" tone="subtle">
					{value}
				</Text>
			)}
		</button>
	</li>
);

ChartLegendItem.displayName = 'ChartLegendItem';

export { ChartLegendItem };
export type { ChartLegendItemProps };
