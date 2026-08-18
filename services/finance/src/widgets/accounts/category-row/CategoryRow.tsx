import { useMemo } from "react";
import { cn } from "@internal/ui-library";
import {
	CategoryHeader,
	CompositionBar,
	CategorySegmentBlock,
	categoryColor,
	toAccountSegments
} from "@entity/accounts";
import { useAccountsConvertion, useAccountsBrowser } from "@feature/accounts";

import type { FC } from "react";
import type { AccountCategoryView } from "@entity/accounts";


interface CategoryRowProps {
	categoryEntry: AccountCategoryView;
}

const CategoryRow: FC<CategoryRowProps> = ({ categoryEntry }) => {
	const { category, account, selectCategory, selectSegment } = useAccountsBrowser();
	const { convertToUserCurrency } = useAccountsConvertion();

	const color = useMemo(() => {
		return categoryColor(categoryEntry.id);
	}, [categoryEntry.id]);
	const totalFormatted = useMemo(() => {
		return convertToUserCurrency(categoryEntry.totalUsd);
	}, [categoryEntry.totalUsd, convertToUserCurrency]);
	const segments = useMemo(() => {
		return toAccountSegments(categoryEntry.accounts);
	}, [categoryEntry.accounts]);

	return (
		<div
			onClick={() => { selectCategory(categoryEntry.id); }}
			className={cn(
				"-mx-2 cursor-pointer rounded-[var(--radius-md)] px-2 py-2 hover:bg-secondary",
				(categoryEntry.id === category.id) && "bg-secondary",
			)}
		>
			<CategoryHeader 
				label={categoryEntry.label}
				color={color}
				totalFormatted={totalFormatted} 
			/>
			<CompositionBar>
				{segments.map((segment) => (
					<CategorySegmentBlock
						key={segment.accountId}
						color={color}
						width={segment.width}
						shade={segment.shade}
						title={segment.name}
						selected={categoryEntry.id === category.id && segment.accountId === account.id}
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
