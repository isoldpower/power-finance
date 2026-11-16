type Random = () => number;

const UINT32_RANGE = 4_294_967_296;

const createRandom = (seed: number): Random => {
	let state = seed >>> 0;

	return () => {
		state = (state + 0x6d2b79f5) >>> 0;
		let mixed = state;
		mixed = Math.imul(mixed ^ (mixed >>> 15), mixed | 1);
		mixed ^= mixed + Math.imul(mixed ^ (mixed >>> 7), mixed | 61);

		const unsigned = (mixed ^ (mixed >>> 14)) >>> 0;

		return unsigned / UINT32_RANGE;
	};
};

const between = (random: Random, min: number, max: number): number => {
	const span = max - min;

	return min + random() * span;
};

const chance = (random: Random, probability: number): boolean => random() < probability;

const pick = <T>(random: Random, items: readonly T[]): T => {
	const index = Math.floor(random() * items.length);

	return items[index];
};

const roundCents = (value: number): number => Math.round(value * 100) / 100;

export { between, chance, createRandom, pick, roundCents };
export type { Random };
