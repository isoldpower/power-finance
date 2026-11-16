interface StackedLayer {
	key: string;
	bands: [number, number][];
}

interface StackedLayout {
	layers: StackedLayer[];
}

export type { StackedLayer, StackedLayout };
