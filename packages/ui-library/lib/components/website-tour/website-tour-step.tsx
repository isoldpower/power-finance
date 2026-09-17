import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";

import { SPOTLIGHT_PADDING, SPOTLIGHT_RADIUS } from "./context/config.ts";
import { useWebsiteTourContext } from "./context/context.ts";
import type { ResolvedTourStep, TourPlacement } from "./context/types.ts";


interface WebsiteTourStepProps {
	children: ReactNode;
	order: number;
	selectorId: string;
	placement?: TourPlacement;
	padding?: number;
	borderRadius?: number;
	closeable?: boolean;
	skippable?: boolean;
	verticalOffset?: number;
}

function WebsiteTourStep({
	children,
	order,
	selectorId,
	placement = 'bottom',
	padding = SPOTLIGHT_PADDING,
	borderRadius = SPOTLIGHT_RADIUS,
	closeable = true,
	skippable = true,
	verticalOffset = 0
}: WebsiteTourStepProps) {
	const { addStep, removeStep, uid } = useWebsiteTourContext();
	const label = useMemo(() => `${uid}-tour-step-${String(order)}`, [uid, order]);

	const step = useMemo<ResolvedTourStep>(() => ({
		order,
		label,
		selectorId,
		content: children,
		placement,
		padding,
		borderRadius,
		closeable,
		skippable,
		verticalOffset
	}), [
		order, label, selectorId, children, placement,
		padding, borderRadius, closeable, skippable, verticalOffset
	]);

	useEffect(() => {
		addStep(step);

		return () => { removeStep(step); };
	}, [step, addStep, removeStep]);

	return null;
}

WebsiteTourStep.displayName = 'WebsiteTourStep';

export { WebsiteTourStep };
export type { WebsiteTourStepProps };
