import { easeOutCubic } from "../curves";

import type { RefObject } from "react";


interface CountUpTween {
	startedAt: number;
	duration: number;
	startValue: number;
	endValue: number;
	frameRef: RefObject<number>;
	setValue: (value: number) => void;
}

function tweenProgress(tween: CountUpTween, now: number): number {
	const elapsed = now - tween.startedAt;

	return elapsed <= 0 
		? 0 
		: Math.min(elapsed / tween.duration, 1);
}

function advanceTween(tween: CountUpTween, currentValue: number): void {
	const currentProgress = tweenProgress(tween, currentValue);
	const amountTravelled = (tween.endValue - tween.startValue) * easeOutCubic(currentProgress);

	tween.setValue(tween.startValue + amountTravelled);
	if (currentProgress < 1) {
		tween.frameRef.current = requestAnimationFrame(
			advanceTween.bind(null, tween)
		);
	}
}

function startTween(tween: CountUpTween): void {
	cancelAnimationFrame(tween.frameRef.current);
	tween.frameRef.current = requestAnimationFrame(
		advanceTween.bind(null, tween)
	);
}

function stopTween(frameRef: RefObject<number>): void {
	cancelAnimationFrame(frameRef.current);
}

export { startTween, stopTween };
export type { CountUpTween };
