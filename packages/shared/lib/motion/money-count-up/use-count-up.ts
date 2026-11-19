import {useEffect, useMemo, useRef, useState} from "react";
import { startTween, stopTween } from "./count-up-tween.ts";
import { prefersReducedMotion } from "../reduced-motion.ts";
import { initialValue } from "./initial-value.ts";
import { DEFAULT_COUNT_UP } from "./config.ts";

import type { CountUpOptions } from "./config.ts";


const useCountUp = (
	target: number | null,
	options: CountUpOptions = {}
): number | null => {
	const { introDuration, retargetDuration, delay, introRatio } = useMemo(() => {
		return Object.assign(
			DEFAULT_COUNT_UP,
			options,
		) as Required<CountUpOptions>;
	}, [options]);
	const reducedMotionRef = useRef(prefersReducedMotion());
	const computedInitial = useMemo(() => {
		return initialValue(target, introRatio, reducedMotionRef.current);
	}, [introRatio, target]);
	
	const [displayedValue, setDisplayedValue] = useState<number>(computedInitial);
	const displayedValueRef = useRef(displayedValue);
	const introPlayedRef = useRef(false);
	const animationFrameRef = useRef(0);

	useEffect(() => {
		if (target === null) {
			return undefined;
		} else if (reducedMotionRef.current) {
			setDisplayedValue(target);
			introPlayedRef.current = true;
			
			return undefined;
		}
		
		const isIntro = !introPlayedRef.current;
		const startValue = isIntro 
			? target * introRatio 
			: displayedValueRef.current;
		introPlayedRef.current = true;

		if (startValue === target) {
			setDisplayedValue(target);
			
			return undefined;
		} else {
			startTween({
				startedAt: performance.now() + (isIntro ? delay : 0),
				duration: isIntro ? introDuration : retargetDuration,
				startValue,
				endValue: target,
				frameRef: animationFrameRef,
				setValue: setDisplayedValue,
			});
	
			return stopTween.bind(null, animationFrameRef);
		}
	}, [target, introDuration, retargetDuration, delay, introRatio]);

	return useMemo(() => {
		return target === null
			? null
			: displayedValue;
	}, [displayedValue, target]);
};

export { useCountUp };
export type { CountUpOptions };
