import { useCallback, useState } from "react";

import { defaultWebsiteTourValue } from "../context/config.ts";

import type { ResolvedTourStep } from "../context/types.ts";
import type { WebsiteTourOptions } from "./types.ts";


type TourStepsOptions = Pick<WebsiteTourOptions, 'onStart' | 'onStepChange' | 'onSkip' | 'onFinish'> & {
	completed: boolean;
	setCompleted: (value: boolean) => void;
};

const useTourSteps = ({
	completed,
	setCompleted,
	onStart,
	onStepChange,
	onSkip,
	onFinish
}: TourStepsOptions) => {
	const [steps, setSteps] = useState<ResolvedTourStep[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(defaultWebsiteTourValue.activeStep);

	const activeTourStep = steps[activeIndex] as ResolvedTourStep | undefined;

	const addStep = useCallback((step: ResolvedTourStep) => {
		setSteps((current) => [...current.filter((entry) => entry.order !== step.order), step]
			.sort((first, second) => first.order - second.order));
	}, []);

	const removeStep = useCallback((step: ResolvedTourStep) => {
		setSteps((current) => current.filter((entry) => entry.order !== step.order));
	}, []);

	const startTour = useCallback(() => {
		if (completed) return;

		setActiveIndex(0);
		onStart?.();
	}, [completed, onStart]);

	const endTour = useCallback(() => {
		setActiveIndex(defaultWebsiteTourValue.activeStep);
	}, []);

	const skipTour = useCallback(() => {
		onSkip?.(activeIndex);
		setCompleted(true);
		endTour();
	}, [activeIndex, onSkip, setCompleted, endTour]);

	const stepForward = useCallback(() => {
		if (activeIndex < 0) return;

		if (activeIndex + 1 < steps.length) {
			setActiveIndex(activeIndex + 1);
			onStepChange?.(activeIndex + 1);

			return;
		}

		setCompleted(true);
		endTour();
		onFinish?.();
	}, [activeIndex, steps.length, onStepChange, onFinish, setCompleted, endTour]);

	const stepBack = useCallback(() => {
		if (activeIndex <= 0) return;

		setActiveIndex(activeIndex - 1);
		onStepChange?.(activeIndex - 1);
	}, [activeIndex, onStepChange]);

	return {
		steps,
		activeIndex,
		activeTourStep,
		addStep,
		removeStep,
		startTour,
		endTour,
		skipTour,
		stepBack,
		stepForward
	};
};

export { useTourSteps };
