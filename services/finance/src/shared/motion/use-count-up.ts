import { useEffect, useRef, useState } from "react";

interface CountUpOptions {
	introDuration?: number;
	retargetDuration?: number;
	delay?: number;
	introRatio?: number;
}

const easeOutCubic = (progress: number): number => 1 - Math.pow(1 - progress, 3);

const prefersReducedMotion = (): boolean =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const useCountUp = (target: number | null, options: CountUpOptions = {}): number | null => {
	const {
		introDuration = 1150,
		retargetDuration = 850,
		delay = 320,
		introRatio = 0.9,
	} = options;

	const reduceRef = useRef(prefersReducedMotion());
	const [value, setValue] = useState<number>(() => {
		if (target === null) return 0;
		return reduceRef.current ? target : target * introRatio;
	});
	const valueRef = useRef(value);
	valueRef.current = value;
	const playedRef = useRef(false);
	const rafRef = useRef(0);

	useEffect(() => {
		if (target === null) return;
		if (reduceRef.current) {
			setValue(target);
			playedRef.current = true;
			return;
		}

		const isIntro = !playedRef.current;
		const from = isIntro ? target * introRatio : valueRef.current;
		const duration = isIntro ? introDuration : retargetDuration;
		const startAt = performance.now() + (isIntro ? delay : 0);
		playedRef.current = true;

		if (from === target) {
			setValue(target);
			return;
		}

		const tick = (now: number) => {
			const elapsed = now - startAt;
			const progress = elapsed <= 0 ? 0 : Math.min(elapsed / duration, 1);
			setValue(from + (target - from) * easeOutCubic(progress));
			if (progress < 1) rafRef.current = requestAnimationFrame(tick);
		};

		cancelAnimationFrame(rafRef.current);
		rafRef.current = requestAnimationFrame(tick);
		return () => { cancelAnimationFrame(rafRef.current); };
	}, [target, introDuration, retargetDuration, delay, introRatio]);

	return target === null ? null : value;
};

export { useCountUp };
export type { CountUpOptions };
