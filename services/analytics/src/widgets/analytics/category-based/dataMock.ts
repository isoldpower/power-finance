
import type { CategorisedDataSet, CategorisedDataPiece } from "@entity/analytics/model";

const categories = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Other', 'Health', 'Education', 'Travel', 'Bills'];
const data: CategorisedDataSet = Object.fromEntries(
    Array.from({ length: 30 }).reduce((
        acc: [string, CategorisedDataPiece][],
        _,
        index: number
    ) => {
        const date = new Date(2023, index + 1, 1, 12);
		const category = categories[Math.floor(Math.random() * categories.length)];
		const amount = Math.random() * 10000;

        acc.push([date.toISOString(), { 
            category,
            amount
        }]);
        
        return acc;
    }, [])
);

const groupedData = Object.values(data)
	.reduce<Record<string, number>>((acc, item) => {
		if (!acc[item.category]) {
			acc[item.category] = 0;
		}
		
		acc[item.category] += item.amount;
		return acc;
	}, {});

const flatGroupedData = Object.entries(groupedData).map(([category, amount]) => ({ category, amount }));

export { data, groupedData, flatGroupedData };