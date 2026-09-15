import type { Chainable, ChainBound, ChainBoundOptions, ChainPosition } from "./types.ts";


const positionOf = (hasAbove: boolean, hasBelow: boolean): ChainPosition => {
	if (hasAbove && hasBelow) return 'middle';
	if (hasAbove) return 'end';

	return hasBelow ? 'start' : 'single';
};

const joinsRun = <TItem extends Chainable>(
	run: TItem[] | undefined,
	item: TItem,
): boolean => {
	const chainId = item.chain?.id;
	if (run === undefined || chainId === undefined) return false;

	return run[0]?.chain?.id === chainId;
};

const toChainRuns = <TItem extends Chainable>(items: TItem[]): TItem[][] => {
	const runs: TItem[][] = [];

	for (const item of items) {
		const current = runs.at(-1);

		if (joinsRun(current, item) && current !== undefined) {
			current.push(item);
		} else {
			runs.push([item]);
		}
	}

	return runs;
};

const toChainBound = <TItem extends Chainable>(
	items: TItem[],
	options: ChainBoundOptions = {},
): ChainBound<TItem>[] => {
	const runs = toChainRuns(items);

	return runs.flatMap((run, runIndex) => {
		const chain = run[0]?.chain ?? null;
		const truncated = chain !== null && run.length < chain.size;
		const openBefore = truncated && runIndex === 0 && (options.continuesBefore ?? false);
		const openAfter = truncated && runIndex === runs.length - 1 && (options.continuesAfter ?? false);

		return run.map((item, index) => ({
			item,
			chain: item.chain ?? null,
			position: positionOf(
				index > 0 || openBefore,
				index < run.length - 1 || openAfter
			),
			index,
			visible: run.length,
			truncated,
		}));
	});
};

export { toChainBound };
