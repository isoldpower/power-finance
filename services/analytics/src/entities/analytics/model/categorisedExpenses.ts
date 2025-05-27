interface CategorisedDataPiece {
	category: string;
	amount: number;
}

type CategorisedDataSet = Record<string, CategorisedDataPiece>;

interface CategorisedDataFlat {
	date: string;
	category: string;
	amount: number;
}

export type { CategorisedDataPiece, CategorisedDataSet, CategorisedDataFlat };
