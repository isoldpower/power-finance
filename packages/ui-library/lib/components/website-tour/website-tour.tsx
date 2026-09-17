import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import { WebsiteTourProvider } from "./context/context.ts";
import { defaultWebsiteTourValue, TARGET_RETRY_FRAMES, TARGET_SETTLE_FRAMES } from "./context/config.ts";
import { TourStepContextProvider } from "./step-context/context.ts";
import { WebsiteTourInvite } from "./website-tour-invite.tsx";
import { WebsiteTourPopover } from "./website-tour-popover.tsx";
import { WebsiteTourSpotlight } from "./website-tour-spotlight.tsx";
import { WebsiteTourStep } from "./website-tour-step.tsx";
import { WebsiteTourTrigger } from "./website-tour-trigger.tsx";
import { useTourCompletion } from "./website-tour-completion.ts";
import { getElementRect, sameRect, shiftRect, waitForAnimations } from "./website-tour-position.ts";

import type { ResolvedTourStep, TourRect, WebsiteTourPayload } from './context/types.ts';
import type { TourStepContextType } from './step-context/types.ts';


interface WebsiteTourProps {
	children: ReactNode;
	completed?: boolean;
	storageKey?: string;
	className?: string;
	onStart?: () => void;
	onStepChange?: (step: number) => void;
	onSkip?: (step: number) => void;
	onFinish?: () => void;
}

function WebsiteTour({
	children,
	completed: initialCompleted = false,
	storageKey,
	className,
	onStart,
	onStepChange,
	onSkip,
	onFinish
}: WebsiteTourProps) {
	const uid = useId();
	const rootReference = useRef<HTMLSpanElement>(null);

	const [steps, setSteps] = useState<ResolvedTourStep[]>([]);
	const [activeIndex, setActiveIndex] = useState<number>(defaultWebsiteTourValue.activeStep);
	const [target, setTarget] = useState<TourRect | null>(null);
	const [completed, setCompleted] = useTourCompletion(storageKey, initialCompleted);

	const activeTourStep = steps[activeIndex] as ResolvedTourStep | undefined;

	const addStep = useCallback((step: ResolvedTourStep) => {
		setSteps((cur) => [...cur.filter((entry) => entry.order !== step.order), step]
			.sort((first, second) => first.order - second.order));
	}, []);

	const removeStep = useCallback((step: ResolvedTourStep) => {
		setSteps((cur) => cur.filter((entry) => entry.order !== step.order));
	}, []);

	const startTour = useCallback(() => {
		if (completed) return;

		setActiveIndex(0);
		onStart?.();
	}, [completed, onStart]);

	const endTour = useCallback(() => {
		setActiveIndex(defaultWebsiteTourValue.activeStep);
		setTarget(null);
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

	const findScope = useCallback((): Document | ShadowRoot => {
		return (rootReference.current?.getRootNode() ?? document) as Document | ShadowRoot;
	}, []);

	const findElement = useCallback((selectorId: string): HTMLElement | null => {
		return findScope().getElementById(selectorId) as HTMLElement | null;
	}, [findScope]);

	const measureTarget = useCallback(() => {
		if (!activeTourStep) return;

		const element = findElement(activeTourStep.selectorId);

		if (element) setTarget(shiftRect(getElementRect(element), activeTourStep.verticalOffset));
	}, [activeTourStep, findElement]);

	useEffect(() => {
		if (!activeTourStep) return;

		const element = findElement(activeTourStep.selectorId);
		const rect = element?.getBoundingClientRect();

		if (!rect || (rect.top >= 0 && rect.bottom <= window.innerHeight)) return;

		element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
	}, [activeTourStep, findElement]);

	useEffect(() => {
		if (!activeTourStep) return;

		let cancelled = false;
		let frame = 0;

		const resolveElement = () => new Promise<HTMLElement | null>((resolve) => {
			let attempts = 0;

			const attempt = () => {
				const element = findElement(activeTourStep.selectorId);

				if (element || attempts > TARGET_RETRY_FRAMES) {
					resolve(element);

					return;
				}

				attempts += 1;
				frame = window.requestAnimationFrame(attempt);
			};

			attempt();
		});

		const settle = (element: HTMLElement) => {
			let attempts = 0;
			let settled = 0;
			let measured: TourRect | null = null;

			const attempt = () => {
				if (cancelled) return;

				const rect = shiftRect(getElementRect(element), activeTourStep.verticalOffset);
				attempts += 1;

				if (sameRect(rect, measured)) {
					settled += 1;
				} else {
					measured = rect;
					settled = 0;
					setTarget(rect);
				}

				if (settled >= TARGET_SETTLE_FRAMES || attempts > TARGET_RETRY_FRAMES) return;

				frame = window.requestAnimationFrame(attempt);
			};

			attempt();
		};

		const track = async () => {
			const element = await resolveElement();

			if (cancelled || !element) return;

			setTarget(shiftRect(getElementRect(element), activeTourStep.verticalOffset));

			await waitForAnimations(findScope());

			if (cancelled) return;

			settle(element);
		};

		void track();

		return () => {
			cancelled = true;
			window.cancelAnimationFrame(frame);
		};
	}, [activeTourStep, findElement, findScope]);

	useEffect(() => {
		window.addEventListener('resize', measureTarget);
		window.addEventListener('scroll', measureTarget, true);

		return () => {
			window.removeEventListener('resize', measureTarget);
			window.removeEventListener('scroll', measureTarget, true);
		};
	}, [measureTarget]);

	useEffect(() => {
		if (activeIndex < 0) return;

		const handleKey = (event: KeyboardEvent) => {
			if (event.key === 'ArrowRight') stepForward();
			if (event.key === 'ArrowLeft') stepBack();
			if (event.key === 'Escape') skipTour();
		};

		window.addEventListener('keydown', handleKey);

		return () => { window.removeEventListener('keydown', handleKey); };
	}, [activeIndex, stepForward, stepBack, skipTour]);

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

	return (
		<WebsiteTourProvider value={payload}>
			<span ref={rootReference} hidden />
			{children}
			{stepValue && (
				<TourStepContextProvider value={stepValue}>
					<WebsiteTourSpotlight className={className} />
					<WebsiteTourPopover />
				</TourStepContextProvider>
			)}
		</WebsiteTourProvider>
	);
}

WebsiteTour.displayName = 'WebsiteTour';
WebsiteTour.Step = WebsiteTourStep;
WebsiteTour.Invite = WebsiteTourInvite;
WebsiteTour.Trigger = WebsiteTourTrigger;

export { WebsiteTour };
export type { WebsiteTourProps };
