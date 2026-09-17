import { cn } from "@/utils";
import styles from './WebsiteTour.module.css';
import { useTourStepContext } from "./step-context/context.ts";
import { padRect } from "./website-tour-position.ts";

import type { FC } from "react";


interface WebsiteTourSpotlightProps {
	className?: string;
}

const WebsiteTourSpotlight: FC<WebsiteTourSpotlightProps> = ({ className }) => {
	const { step, target } = useTourStepContext();
	const spotlight = padRect(target, step.padding);

	return (
		<>
			<div className={cn("pointer-events-auto fixed inset-0 z-50", styles.websiteTour__blocker)} />
			<div
				aria-hidden
				className={cn(
					"pointer-events-none fixed z-[60] border-2 border-primary",
					styles.websiteTour__spotlight,
					className
				)}
				style={{
					top: spotlight.top,
					left: spotlight.left,
					width: spotlight.width,
					height: spotlight.height,
					borderRadius: step.borderRadius,
				}}
			>
				<div className={styles.websiteTour__pulse} />
			</div>
		</>
	);
};

WebsiteTourSpotlight.displayName = 'WebsiteTourSpotlight';

export { WebsiteTourSpotlight };
export type { WebsiteTourSpotlightProps };
