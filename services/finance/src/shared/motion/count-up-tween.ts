import { easeOutCubic } from "./easing.ts";

import type { RefObject } from "react";


interface CountUpTween {
	startedAt: number;
	duration: number;
	startValue: number;
	endValue: number;
	frameRef: RefObject<number>;
	setValue: (value: number) => void;
}

const NOT_STARTED_PROGRESS = 0;
const COMPLETE_PROGRESS = 1;

const tweenProgress = (tween: CountUpTween, now: number): number => {
	const elapsed = now - tween.startedAt;

	if (elapsed <= 0) {
		return NOT_STARTED_PROGRESS;
	}

	return Math.min(elapsed / tween.duration, COMPLETE_PROGRESS);
};

// Requests its own next frame until the tween completes; bound to the tween so no closure is needed.
const advanceTween = (tween: CountUpTween, now: number): void => {
	const progress = tweenProgress(tween, now);
	const travelled = (tween.endValue - tween.startValue) * easeOutCubic(progress);

	tween.setValue(tween.startValue + travelled);

	if (progress < COMPLETE_PROGRESS) {
		tween.frameRef.current = requestAnimationFrame(advanceTween.bind(null, tween));
	}
};

const startTween = (tween: CountUpTween): void => {
	cancelAnimationFrame(tween.frameRef.current);
	tween.frameRef.current = requestAnimationFrame(advanceTween.bind(null, tween));
};

const stopTween = (frameRef: RefObject<number>): void => {
	cancelAnimationFrame(frameRef.current);
};

export { startTween, stopTween };
export type { CountUpTween };
