interface CountUpOptions {
	introDuration?: number;
	retargetDuration?: number;
	delay?: number;
	introRatio?: number;
}

const DEFAULT_COUNT_UP: CountUpOptions = {
	introDuration: 1150,
	retargetDuration: 850,
	delay: 320,
	introRatio: 0.9,
};

export { DEFAULT_COUNT_UP };
export type { CountUpOptions };