import { useEffect, useRef, useState } from "react";

import { startTween, stopTween } from "./count-up-tween.ts";
import { prefersReducedMotion } from "./reduced-motion.ts";


interface CountUpOptions {
	introDuration?: number;
	retargetDuration?: number;
	delay?: number;
	introRatio?: number;
}

const DEFAULT_INTRO_DURATION = 1150;
const DEFAULT_RETARGET_DURATION = 850;
const DEFAULT_DELAY = 320;
const DEFAULT_INTRO_RATIO = 0.9;
const NO_ANIMATION_FRAME = 0;
const EMPTY_VALUE = 0;
const NO_DELAY = 0;

const initialValue = (target: number | null, introRatio: number, reducedMotion: boolean): number => {
	if (target === null) {
		return EMPTY_VALUE;
	}

	if (reducedMotion) {
		return target;
	}

	return target * introRatio;
};

// Animates a number towards `target`: the first run climbs from a fraction of it, later changes
// tween from whatever is currently on screen. Returns null while the target is unknown.
const useCountUp = (target: number | null, options: CountUpOptions = {}): number | null => {
	const {
		introDuration = DEFAULT_INTRO_DURATION,
		retargetDuration = DEFAULT_RETARGET_DURATION,
		delay = DEFAULT_DELAY,
		introRatio = DEFAULT_INTRO_RATIO,
	} = options;

	const reducedMotionRef = useRef(prefersReducedMotion());
	const [displayedValue, setDisplayedValue] = useState<number>(
		initialValue(target, introRatio, reducedMotionRef.current),
	);

	const displayedValueRef = useRef(displayedValue);
	displayedValueRef.current = displayedValue;

	const introPlayedRef = useRef(false);
	const animationFrameRef = useRef(NO_ANIMATION_FRAME);

	useEffect(() => {
		if (target === null) {
			return;
		}

		if (reducedMotionRef.current) {
			setDisplayedValue(target);
			introPlayedRef.current = true;

			return;
		}

		const isIntro = !introPlayedRef.current;
		const startValue = isIntro ? target * introRatio : displayedValueRef.current;

		introPlayedRef.current = true;

		if (startValue === target) {
			setDisplayedValue(target);

			return;
		}

		startTween({
			startedAt: performance.now() + (isIntro ? delay : NO_DELAY),
			duration: isIntro ? introDuration : retargetDuration,
			startValue,
			endValue: target,
			frameRef: animationFrameRef,
			setValue: setDisplayedValue,
		});

		return stopTween.bind(null, animationFrameRef);
	}, [target, introDuration, retargetDuration, delay, introRatio]);

	if (target === null) {
		return null;
	}

	return displayedValue;
};

export { useCountUp };
export type { CountUpOptions };
