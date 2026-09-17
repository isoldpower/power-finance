import { useMemo } from "react";
import { cn } from "@internal/ui-library";
import {
	CategoryHeader,
	CompositionBar,
	CategorySegmentBlock,
	categoryColor,
	toAccountSegments,
	toSegmentsScale
} from "@entity/accounts";
import { useAccountsConvertion, useAccountsBrowser } from "@feature/accounts";

import type { FC } from "react";
import type { AccountCategoryView } from "@entity/accounts";


interface CategoryRowProps {
	categoryEntry: AccountCategoryView;
}

const CategoryRow: FC<CategoryRowProps> = ({ categoryEntry }) => {
	const { categories, category, account, selectCategory, selectSegment } = useAccountsBrowser();
	const { convertToUserCurrency, sumToUserCurrency } = useAccountsConvertion();

	const selected = categoryEntry.id === category?.id;
	const color = useMemo(() => {
		return categoryColor(categoryEntry.id);
	}, [categoryEntry.id]);
	const totalFormatted = useMemo(() => {
		return sumToUserCurrency(categoryEntry.accounts.map((account) => account.balance));
	}, [categoryEntry.accounts, sumToUserCurrency]);
	const segments = useMemo(() => {
		return toAccountSegments(categoryEntry.accounts, toSegmentsScale(categories));
	}, [categories, categoryEntry.accounts]);
	const balances = useMemo(() => {
		return new Map(categoryEntry.accounts.map((entry) => [entry.id, convertToUserCurrency(entry.balance)]));
	}, [categoryEntry.accounts, convertToUserCurrency]);

	return (
		<div
			onClick={() => { selectCategory(categoryEntry.id); }}
			className={cn(
				"-mx-3 my-0.5 cursor-pointer rounded-[var(--radius-sm)] px-3 py-2.5 transition-colors",
				selected
					? "bg-[var(--accent-soft)] shadow-[inset_0_0_0_1px_var(--accent-border)]"
					: "hover:bg-secondary",
			)}
		>
			<CategoryHeader 
				label={categoryEntry.label}
				color={color}
				totalFormatted={totalFormatted}
				selected={selected}
			/>
			<CompositionBar>
				{segments.map((segment) => (
					<CategorySegmentBlock
						key={segment.accountId}
						color={color}
						width={segment.width}
						shade={segment.shade}
						title={`${segment.name} · ${balances.get(segment.accountId) ?? ''}`}
						selected={selected && segment.accountId === account?.id}
						onClick={(event) => {
							event.stopPropagation();
							selectSegment(categoryEntry.id, segment.accountId);
						}}
					/>
				))}
			</CompositionBar>
		</div>
	);
}

CategoryRow.displayName = 'CategoryRow';

export { CategoryRow };
export type { CategoryRowProps };
