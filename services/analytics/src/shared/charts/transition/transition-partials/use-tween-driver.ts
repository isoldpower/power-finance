import { useCallback, useEffect, useMemo, useRef } from "react";
import { easeInOutCubic } from "./driver-partials/ease-in-out-cubic.ts";


type TweenFrame = (progress: number, done: boolean) => void;

interface TweenDriver {
	run: (duration: number, onFrame: TweenFrame) => void;
	cancel: () => void;
	isRunning: () => boolean;
}

const useTweenDriver = (): TweenDriver => {
	const frameRef = useRef(0);
	const runningRef = useRef(false);

	const cancel = useCallback(() => {
		cancelAnimationFrame(frameRef.current);
	}, []);

	const run = useCallback((duration: number, onFrame: TweenFrame) => {
		cancelAnimationFrame(frameRef.current);
		runningRef.current = true;
		const startedAt = performance.now();
		const tick = (now: number): void => {
			const elapsed = now - startedAt;
			const linear = Math.min(1, Math.max(0, elapsed / duration));
			if (linear >= 1) {
				runningRef.current = false;
			}
			onFrame(easeInOutCubic(linear), linear >= 1);
			if (linear < 1) {
				frameRef.current = requestAnimationFrame(tick);
			}
		};
		frameRef.current = requestAnimationFrame(tick);
	}, []);

	const isRunning = useCallback(() => runningRef.current, []);

	useEffect(() => cancel, [cancel]);

	return useMemo(() => ({ run, cancel, isRunning }), [run, cancel, isRunning]);
};

export { useTweenDriver };
export type { TweenDriver, TweenFrame };
