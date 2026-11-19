type Tweenable = number | readonly Tweenable[];

const lerpNumber = (from: number, to: number, progress: number): number => from + (to - from) * progress;

const interpolate = <V extends Tweenable>(from: V, to: V, progress: number): V => {
	if (progress >= 1) {
		return to;
	}
	if (typeof from === 'number' && typeof to === 'number') {
		return lerpNumber(from, to, progress) as V;
	}
	if (typeof from === 'number' || typeof to === 'number' || from.length !== to.length) {
		return to;
	}

	return to.map((value: Tweenable, index) => interpolate(from[index], value, progress)) as unknown as V;
};

const zeroed = <V extends Tweenable>(value: V): V => (
	typeof value === 'number' ? 0 as V : value.map((item: Tweenable) => zeroed(item)) as unknown as V
);

const sameTweenable = (left: Tweenable, right: Tweenable): boolean => {
	if (left === right) {
		return true;
	}
	if (typeof left === 'number' || typeof right === 'number') {
		return false;
	}

	return left.length === right.length && left.every((value, index) => sameTweenable(value, right[index]));
};

export { interpolate, lerpNumber, sameTweenable, zeroed };
export type { Tweenable };
