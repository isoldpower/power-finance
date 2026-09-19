import { useId, useMemo } from "react";

import { defaultWebsiteTourValue } from "../context/config.ts";
import { useTourCompletion } from "./use-tour-completion.ts";
import { useTourKeyboard } from "./use-tour-keyboard.ts";
import { useTourScope } from "./use-tour-scope.ts";
import { useTourSteps } from "./use-tour-steps.ts";
import { useTourTarget } from "./use-tour-target.ts";

import type { ResolvedTourStep, WebsiteTourPayload } from "../context/types.ts";
import type { TourStepContextType } from "../step-context/types.ts";
import type { WebsiteTourOptions, WebsiteTourState } from "./types.ts";


const useWebsiteTour = ({
	completed: initialCompleted = false,
	storageKey,
	onStart,
	onStepChange,
	onSkip,
	onFinish
}: WebsiteTourOptions): WebsiteTourState => {
	const uid = useId();

	const [completed, setCompleted] = useTourCompletion(storageKey, initialCompleted);
	const { rootReference, findScope, findElement } = useTourScope();
	const {
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
	} = useTourSteps({ completed, setCompleted, onStart, onStepChange, onSkip, onFinish });

	const target = useTourTarget({ activeTourStep, findElement, findScope });

	useTourKeyboard({ active: activeIndex >= 0, stepForward, stepBack, skipTour });

	const payload = useMemo<WebsiteTourPayload>(() => ({
		steps: steps.reduce<Record<number, ResolvedTourStep>>((acc, step) => {
			acc[step.order] = step;

			return acc;
		}, {}),
		activeStep: activeTourStep?.order ?? defaultWebsiteTourValue.activeStep,
		completed,
		isActive: activeIndex >= 0,
		totalSteps: steps.length,
		addStep,
		removeStep,
		startTour,
		endTour,
		skipTour,
		stepBack,
		stepForward,
		uid
	}), [
		steps, activeTourStep, activeIndex, completed, uid,
		addStep, removeStep, startTour, endTour, skipTour, stepBack, stepForward
	]);

	const stepValue = useMemo<TourStepContextType | null>(() => {
		if (!activeTourStep || !target) return null;

		return {
			step: activeTourStep,
			target,
			index: activeIndex,
			first: activeIndex === 0,
			last: activeIndex === steps.length - 1
		};
	}, [activeTourStep, target, activeIndex, steps.length]);

	return { rootReference, payload, stepValue };
};

export { useWebsiteTour };
