interface SpendingDataPiece {
    income: number;
    expenses: number;
}

type SpendingDataSet = Record<string, SpendingDataPiece>;

interface SpendingDataFlat {
    date: number;
    income: number;
    expenses: number;
}

export type { SpendingDataPiece, SpendingDataSet, SpendingDataFlat };