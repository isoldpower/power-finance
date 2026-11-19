import { useMemo } from "react";
import { cn } from "@internal/ui-library";

import type { FC } from "react";


interface CounterpartyRowBarProps {
	ratio: number;
	color: string;
	delay: number;
}

const CounterpartyRowBar: FC<CounterpartyRowBarProps> = ({ ratio, color, delay }) => {
	const style = useMemo(() => {
		return {
			width: `${(Math.min(1, ratio) * 100).toFixed(1)}%`,
			background: color,
			animationDelay: `${delay.toString()}ms`,
		};
	}, [ratio, color, delay]);

	return (
		<span className="col-span-2 ml-[30px] block h-1.5 overflow-hidden rounded-full bg-[var(--chart-heat-0)]">
			<span
				className={cn(
					"fx-grow-x block h-full rounded-full group-hover:brightness-110",
					"[transition:width_500ms_ease-out,filter_150ms_ease]",
				)}
				style={style}
			/>
		</span>
	);
};

CounterpartyRowBar.displayName = 'CounterpartyRowBar';

export { CounterpartyRowBar };
export type { CounterpartyRowBarProps };
