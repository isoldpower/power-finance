import type { FC } from "react";
import { FinanceCard, FinanceBadge } from "@internal/ui-library";

import { categoryColor } from "@entity/accounts";
import type { CategorySegment } from "@entity/accounts";
import type { MockAccount, MockAccountCategory } from "@feature/accounts";
import { CategoryRow } from "@widget/accounts";


interface BalanceCompositionProps {
	categories: MockAccountCategory[];
	categoryId: string;
	accountId: string;
	selectCategory: (id: string) => void;
	selectSegment: (categoryId: string, accountId: string) => void;
	convertToUserCurrency: (value: number) => string;
	getSegments: (accounts: MockAccount[]) => CategorySegment[];
}

const BalanceComposition: FC<BalanceCompositionProps> = ({
	categories,
	categoryId,
	accountId,
	selectCategory,
	selectSegment,
	convertToUserCurrency,
	getSegments,
}) => {
	return (
		<FinanceCard className="mb-4 overflow-hidden">
			<div className="flex flex-wrap items-center gap-2.5 border-b border-border px-[18px] py-3.5">
				<span className="text-sm font-semibold">Balance composition</span>
				<FinanceBadge tone="pos" appearance="soft" dot>Assets = Liabilities + Equity</FinanceBadge>
				<div className="flex-1" />
				<span className="hidden font-numeric text-[10px] text-text-3 sm:block">select a category to drill in</span>
			</div>
			<div className="px-[18px] pb-3.5 pt-2">
				{categories.map((entry) => (
					<CategoryRow
						key={entry.id}
						label={entry.label}
						color={categoryColor(entry.id)}
						totalFormatted={convertToUserCurrency(entry.totalUsd)}
						active={entry.id === categoryId}
						segments={getSegments(entry.accounts)}
						isCurrentCategory={entry.id === categoryId}
						selectedAccountId={accountId}
						onSelectCategory={() => { selectCategory(entry.id); }}
						onSelectSegment={(accId) => { selectSegment(entry.id, accId); }}
					/>
				))}
			</div>
		</FinanceCard>
	);
};

BalanceComposition.displayName = 'BalanceComposition';

export { BalanceComposition };
export type { BalanceCompositionProps };
