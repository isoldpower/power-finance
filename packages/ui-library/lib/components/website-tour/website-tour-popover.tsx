import { useEffect, useMemo, useRef, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/utils";
import { UiButton } from "@/entities/root";
import styles from './WebsiteTour.module.css';
import { POPOVER_MAX_WIDTH, POPOVER_MIN_WIDTH } from "./context/config.ts";
import { useWebsiteTourContext } from "./context/context.ts";
import { useTourStepContext } from "./step-context/context.ts";
import { calculatePopoverPosition, padRect } from "./website-tour-position.ts";

import type { FC } from "react";
import type { TourRect } from "./context/types.ts";


interface WebsiteTourPopoverProps {
	className?: string;
	skipLabel?: string;
	backLabel?: string;
	nextLabel?: string;
	finishLabel?: string;
}

const WebsiteTourPopover: FC<WebsiteTourPopoverProps> = ({
	className,
	skipLabel = 'Skip tour',
	backLabel = 'Previous',
	nextLabel = 'Next',
	finishLabel = 'Finish'
}) => {
	const { skipTour, stepBack, stepForward, totalSteps } = useWebsiteTourContext();
	const { step, target, index, first, last } = useTourStepContext();

	const popoverReference = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState<TourRect>({
		top: 0,
		left: 0,
		width: POPOVER_MIN_WIDTH,
		height: 200
	});

	useEffect(() => {
		const element = popoverReference.current;

		if (!element) return;

		const observer = new ResizeObserver(([entry]) => {
			const border = entry.borderBoxSize[0] as ResizeObserverSize | undefined;
			const box = border
				? { width: border.inlineSize, height: border.blockSize }
				: entry.target.getBoundingClientRect();

			setSize((current) => ({ ...current, width: box.width, height: box.height }));
		});

		observer.observe(element);

		return () => { observer.disconnect(); };
	}, []);

	const position = useMemo(() => {
		return calculatePopoverPosition(padRect(target, step.padding), size, step.placement);
	}, [target, size, step.placement, step.padding]);

	return (
		<div
			ref={popoverReference}
			role="dialog"
			aria-label={step.label}
			className={cn(
				"fixed z-[100] rounded-lg border bg-background p-4 shadow-lg",
				styles.websiteTour__popover,
				className
			)}
			style={{
				top: position.top,
				left: position.left,
				minWidth: POPOVER_MIN_WIDTH,
				maxWidth: POPOVER_MAX_WIDTH
			}}
		>
			<div className="absolute right-4 top-4 z-10 flex items-center gap-2">
				<span className="text-xs text-muted-foreground">
					{index + 1} / {totalSteps}
				</span>
				{step.closeable && (
					<button
						type="button"
						onClick={skipTour}
						className={cn(
							"inline-flex size-6 items-center justify-center rounded-sm opacity-70",
							"ring-offset-background transition-opacity hover:opacity-100",
							"focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
						)}
					>
						<X className="size-4" />
						<span className="sr-only">Close</span>
					</button>
				)}
			</div>
			<div key={step.label} className={cn("overflow-hidden", styles.websiteTour__content)}>
				{step.content}
			</div>
			<div className="mt-4 flex items-center justify-between">
				{step.skippable && !last ? (
					<button
						type="button"
						onClick={skipTour}
						className="text-xs text-muted-foreground hover:text-foreground"
					>
						{skipLabel}
					</button>
				) : <div />}
				<div className="flex gap-2">
					{!first && (
						<UiButton variant="outline" size="sm" onClick={stepBack}>
							{backLabel}
						</UiButton>
					)}
					<UiButton size="sm" onClick={stepForward}>
						{last ? finishLabel : nextLabel}
					</UiButton>
				</div>
			</div>
		</div>
	);
};

WebsiteTourPopover.displayName = 'WebsiteTourPopover';

export { WebsiteTourPopover };
export type { WebsiteTourPopoverProps };
