import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@internal/shared";
import { CHANGE_DURATION_MS, INTRO_DURATION_MS } from "./config.ts";
import { interpolate, sameTweenable } from "./transition-partials/interpolate.ts";
import { useTweenDriver } from "./transition-partials/use-tween-driver.ts";

import type { Tweenable } from "./transition-partials/interpolate.ts";


type TweenIntro<V> = 'none' | 'progress' | ((target: V) => V);

interface TweenOptions<V extends Tweenable> {
	resetKey?: string;
	intro?: TweenIntro<V>;
	duration?: number;
}

interface Tween<V extends Tweenable> {
	value: V;
	progress: number;
}

interface TweenState<V extends Tweenable> extends Tween<V> {
	resetKey: string;
}

const introState = <V extends Tweenable>(target: V, intro: TweenIntro<V>, resetKey: string): TweenState<V> => {
	const animated = intro !== 'none' && !prefersReducedMotion();

	return {
		value: animated && typeof intro === 'function' ? intro(target) : target,
		progress: animated ? 0 : 1,
		resetKey,
	};
};

const useTween = <V extends Tweenable>(target: V, options: TweenOptions<V> = {}): Tween<V> => {
	const resetKey = options.resetKey ?? '';
	const intro = options.intro ?? 'none';
	const driver = useTweenDriver();
	const optionsRef = useRef(options);
	const [state, setState] = useState<TweenState<V>>(() => introState(target, intro, resetKey));
	const displayedRef = useRef<V>(state.value);
	const introRunningRef = useRef(false);
	const startedRef = useRef<{ target: V; resetKey: string } | null>(null);

	useEffect(() => {
		optionsRef.current = options;
	});

	useEffect(() => {
		const started = startedRef.current;
		const interrupted = driver.isRunning();
		const isIntro = started === null || started.resetKey !== resetKey || (interrupted && introRunningRef.current);
		if (!isIntro && !interrupted && sameTweenable(started.target, target)) {
			return;
		}
		startedRef.current = { target, resetKey };

		const currentIntro = optionsRef.current.intro ?? 'none';
		if (prefersReducedMotion() || (isIntro && currentIntro === 'none')) {
			displayedRef.current = target;
			setState({ value: target, progress: 1, resetKey });

			return;
		}

		const from = isIntro ? introState(target, currentIntro, resetKey).value : displayedRef.current;
		const duration = optionsRef.current.duration ?? (isIntro ? INTRO_DURATION_MS : CHANGE_DURATION_MS);
		introRunningRef.current = isIntro;
		driver.run(duration, (progress, done) => {
			const value = done ? target : interpolate(from, target, progress);
			displayedRef.current = value;
			setState({ value, progress: isIntro && !done ? progress : 1, resetKey });
		});
	
		return driver.cancel;
	}, [target, resetKey, driver]);

	if (state.resetKey !== resetKey) {
		const start = introState(target, intro, resetKey);

		return { value: start.value, progress: start.progress };
	}

	return { value: state.value, progress: state.progress };
};

export { useTween };
export type { Tween, TweenIntro, TweenOptions };
