import { useCallback, useEffect, useRef, useState } from "react";

import { TARGET_RETRY_FRAMES, TARGET_SETTLE_FRAMES } from "../context/config.ts";
import { getElementRect, sameRect, shiftRect, waitForAnimations } from "../website-tour-position.ts";

import type { ResolvedTourStep, TourRect } from "../context/types.ts";


interface TourTargetOptions {
	activeTourStep: ResolvedTourStep | undefined;
	findElement: (selectorId: string) => HTMLElement | null;
	findScope: () => Document | ShadowRoot;
}

const useTourTarget = ({ activeTourStep, findElement, findScope }: TourTargetOptions) => {
	const [target, setTarget] = useState<TourRect | null>(null);

	const cancelledReference = useRef(false);
	const frameReference = useRef(0);
	const selectorReference = useRef('');
	const offsetReference = useRef(0);
	const elementReference = useRef<HTMLElement | null>(null);
	const resolveAttemptsReference = useRef(0);
	const settleAttemptsReference = useRef(0);
	const settledFramesReference = useRef(0);
	const measuredReference = useRef<TourRect | null>(null);

	const measureTarget = useCallback(() => {
		if (!activeTourStep) return;

		const element = findElement(activeTourStep.selectorId);
		if (element) {
			setTarget(shiftRect(getElementRect(element), activeTourStep.verticalOffset));
		}
	}, [activeTourStep, findElement]);

	const settleFrame = useCallback(() => {
		const element = elementReference.current;

		if (cancelledReference.current || !element) return;

		const tourRect = shiftRect(
			getElementRect(element),
			offsetReference.current
		);
		settleAttemptsReference.current += 1;

		if (sameRect(tourRect, measuredReference.current)) {
			settledFramesReference.current += 1;
		} else {
			measuredReference.current = tourRect;
			settledFramesReference.current = 0;
			setTarget(tourRect);
		}

		const settled = settledFramesReference.current >= TARGET_SETTLE_FRAMES;
		const exhausted = settleAttemptsReference.current > TARGET_RETRY_FRAMES;

		if (settled || exhausted) return;

		frameReference.current = window.requestAnimationFrame(settleFrame);
	}, []);

	const beginSettle = useCallback(async () => {
		const element = elementReference.current;

		if (!element) return;

		setTarget(shiftRect(getElementRect(element), offsetReference.current));

		await waitForAnimations(findScope());

		if (cancelledReference.current) return;

		settleAttemptsReference.current = 0;
		settledFramesReference.current = 0;
		measuredReference.current = null;
		settleFrame();
	}, [findScope, settleFrame]);

	const resolveFrame = useCallback(() => {
		if (cancelledReference.current) return;

		const element = findElement(selectorReference.current);

		if (element) {
			elementReference.current = element;
			void beginSettle();

			return;
		}

		resolveAttemptsReference.current += 1;

		if (resolveAttemptsReference.current > TARGET_RETRY_FRAMES) return;

		frameReference.current = window.requestAnimationFrame(resolveFrame);
	}, [findElement, beginSettle]);

	const cancelTracking = useCallback(() => {
		cancelledReference.current = true;
		window.cancelAnimationFrame(frameReference.current);
	}, []);

	const detachListeners = useCallback(() => {
		window.removeEventListener('resize', measureTarget);
		window.removeEventListener('scroll', measureTarget, true);
	}, [measureTarget]);

	useEffect(() => {
		if (!activeTourStep) setTarget(null);
	}, [activeTourStep]);

	useEffect(() => {
		if (!activeTourStep) return;

		const element = findElement(activeTourStep.selectorId);
		const rect = element?.getBoundingClientRect();

		if (!rect || (rect.top >= 0 && rect.bottom <= window.innerHeight)) return;

		element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [activeTourStep, findElement]);

	useEffect(() => {
		if (!activeTourStep) return;

		cancelledReference.current = false;
		selectorReference.current = activeTourStep.selectorId;
		offsetReference.current = activeTourStep.verticalOffset;
		elementReference.current = null;
		resolveAttemptsReference.current = 0;

		resolveFrame();

		return cancelTracking;
	}, [activeTourStep, resolveFrame, cancelTracking]);

	useEffect(() => {
		window.addEventListener('resize', measureTarget);
		window.addEventListener('scroll', measureTarget, true);

		return detachListeners;
	}, [measureTarget, detachListeners]);

	return target;
};

export { useTourTarget };
