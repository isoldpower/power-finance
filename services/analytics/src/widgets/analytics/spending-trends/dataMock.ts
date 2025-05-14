import { SpendingDataSet, SpendingDataPiece } from "@entity/analytics";

const data: SpendingDataSet = Object.fromEntries(
    Array.from({ length: 30 }).reduce((
        acc: [string, SpendingDataPiece][],
        _,
        index: number
    ) => {
        const date = new Date(2023, index + 1, 1, 12);
        const income = Math.random() * 10000;
        const expenses = Math.random() * 10000;

        acc.push([date.toISOString(), { 
            income: Math.round(income * 100) / 100,
            expenses: Math.round(expenses * 100) / 100
        }]);
        
        return acc;
    }, [])
);

export { data };
