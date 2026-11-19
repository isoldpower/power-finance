import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@internal/shared";
import { CHANGE_DURATION_MS, INTRO_DURATION_MS } from "./config.ts";
import { interpolate, lerpNumber, sameTweenable, zeroed } from "./transition-partials/interpolate.ts";
import { useTweenDriver } from "./transition-partials/use-tween-driver.ts";

import type { Tweenable } from "./transition-partials/interpolate.ts";


type TweenableKey<T> = { [K in keyof T]: T[K] extends Tweenable ? K : never }[keyof T] & string;

type Present<T> = T & { presence: number };

type KeyedIntro = 'none' | 'progress' | 'enter';

interface KeyedTransitionOptions<T extends { key: string }> {
	fields: readonly TweenableKey<T>[];
	enter?: (item: T) => T;
	introFrom?: (item: T) => T;
	intro?: KeyedIntro;
	resetKey?: string;
	duration?: number;
}

interface KeyedTransition<T extends { key: string }> {
	items: Present<T>[];
	progress: number;
}

interface KeyedTransitionState<T extends { key: string }> extends KeyedTransition<T> {
	resetKey: string;
}

interface TransitionLane<T extends { key: string }> {
	base: T;
	from: T;
	to: T;
	fromPresence: number;
	toPresence: number;
}

const fieldOf = <T extends { key: string }>(item: T, field: TweenableKey<T>): Tweenable => item[field] as Tweenable;

const mapFields = <T extends { key: string }>(
	fields: readonly TweenableKey<T>[],
	valueOf: (field: TweenableKey<T>) => Tweenable,
): Partial<T> => Object.fromEntries(fields.map((field) => [field, valueOf(field)])) as Partial<T>;

const zeroEnter = <T extends { key: string }>(fields: readonly TweenableKey<T>[]) => (item: T): T => ({
	...item,
	...mapFields(fields, (field) => zeroed(fieldOf(item, field))),
});

const settle = <T extends { key: string }>(items: readonly T[]): Present<T>[] => (
	items.map((item) => ({ ...item, presence: 1 }))
);

const introState = <T extends { key: string }>(
	items: readonly T[],
	options: KeyedTransitionOptions<T>,
	resetKey: string,
): KeyedTransitionState<T> => {
	const intro = options.intro ?? 'enter';
	if (intro === 'none' || prefersReducedMotion()) {
		return { items: settle(items), progress: 1, resetKey };
	}

	const introFrom = options.introFrom ?? options.enter ?? zeroEnter(options.fields);

	return {
		items: intro === 'enter' ? items.map((item) => ({ ...introFrom(item), presence: 0 })) : settle(items),
		progress: 0,
		resetKey,
	};
};

const sameItems = <T extends { key: string }>(
	left: readonly T[],
	right: readonly T[],
	fields: readonly TweenableKey<T>[],
): boolean => left.length === right.length && left.every((item, index) => (
	item.key === right[index].key
	&& fields.every((field) => sameTweenable(fieldOf(item, field), fieldOf(right[index], field)))
));

const changeLanes = <T extends { key: string }>(
	previous: readonly Present<T>[],
	items: readonly T[],
	enter: (item: T) => T,
): TransitionLane<T>[] => {
	const previousByKey = new Map(previous.map((item) => [item.key, item]));
	const targetKeys = new Set(items.map((item) => item.key));
	const lanes: TransitionLane<T>[] = items.map((item) => {
		const prior = previousByKey.get(item.key);

		return prior
			? { base: item, from: prior, to: item, fromPresence: prior.presence, toPresence: 1 }
			: { base: item, from: enter(item), to: item, fromPresence: 0, toPresence: 1 };
	});
	previous.forEach((prior, index) => {
		if (targetKeys.has(prior.key)) {
			return;
		}
		lanes.splice(Math.min(index, lanes.length), 0, {
			base: prior,
			from: prior,
			to: enter(prior),
			fromPresence: prior.presence,
			toPresence: 0,
		});
	});

	return lanes;
};

const useKeyedTransition = <T extends { key: string }>(
	items: readonly T[],
	options: KeyedTransitionOptions<T>,
): KeyedTransition<T> => {
	const resetKey = options.resetKey ?? '';
	const driver = useTweenDriver();
	const optionsRef = useRef(options);
	const [state, setState] = useState<KeyedTransitionState<T>>(() => introState(items, options, resetKey));
	const displayedRef = useRef<Present<T>[]>(state.items);
	const introRunningRef = useRef(false);
	const startedRef = useRef<{ items: readonly T[]; resetKey: string } | null>(null);

	useEffect(() => {
		optionsRef.current = options;
	});

	useEffect(() => {
		const current = optionsRef.current;
		const started = startedRef.current;
		const interrupted = driver.isRunning();
		const isIntro = started === null || started.resetKey !== resetKey || (interrupted && introRunningRef.current);
		if (!isIntro && !interrupted && sameItems(started.items, items, current.fields)) {
			return;
		}
		startedRef.current = { items, resetKey };

		const intro = current.intro ?? 'enter';
		if (prefersReducedMotion() || (isIntro && intro === 'none')) {
			displayedRef.current = settle(items);
			setState({ items: displayedRef.current, progress: 1, resetKey });

			return;
		}

		const fields = current.fields;
		const enter = current.enter ?? zeroEnter(fields);
		const lanes = isIntro
			? introState(items, current, resetKey).items.map((from, index) => ({
				base: items[index],
				from,
				to: items[index],
				fromPresence: from.presence,
				toPresence: 1,
			}))
			: changeLanes(displayedRef.current, items, enter);
		const duration = current.duration ?? (isIntro ? INTRO_DURATION_MS : CHANGE_DURATION_MS);

		introRunningRef.current = isIntro;
		driver.run(duration, (progress, done) => {
			displayedRef.current = done ? settle(items) : lanes.map((lane) => ({
				...lane.base,
				...mapFields(fields, (field) => interpolate(fieldOf(lane.from, field), fieldOf(lane.to, field), progress)),
				presence: lerpNumber(lane.fromPresence, lane.toPresence, progress),
			}));
			setState({ items: displayedRef.current, progress: isIntro && !done ? progress : 1, resetKey });
		});
	
		return driver.cancel;
	}, [items, resetKey, driver]);

	if (state.resetKey !== resetKey) {
		const start = introState(items, options, resetKey);

		return { items: start.items, progress: start.progress };
	}

	return { items: state.items, progress: state.progress };
};

export { useKeyedTransition };
export type { KeyedIntro, KeyedTransition, KeyedTransitionOptions, Present, TweenableKey };
