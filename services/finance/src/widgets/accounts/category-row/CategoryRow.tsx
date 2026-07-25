import {FC, useMemo} from "react";
import { cn } from "@internal/ui-library";

import { CategoryHeader, CompositionBar, CategorySegmentBlock, categoryColor } from "@entity/accounts";
import { MockAccountCategory, calculateAccountsShare, useAccountsConvertion } from "@feature/accounts";
import {useAccountsBrowser} from "@feature/accounts/browse-accounts/BrowseAccountsContext.tsx";


interface CategoryRowProps {
	categoryEntry: MockAccountCategory;
}

const CategoryRow: FC<CategoryRowProps> = ({ categoryEntry }) => {
	const { category, account, selectCategory, selectSegment } = useAccountsBrowser();
	const { convertToUserCurrency } = useAccountsConvertion();

	const color = categoryColor(categoryEntry.id);
	const active = categoryEntry.id === category.id;
	const selectedAccountId = account.id;
	const totalFormatted = convertToUserCurrency(categoryEntry.totalUsd);
	const segments = useMemo(() => calculateAccountsShare(categoryEntry.accounts), [categoryEntry.accounts]);

	return (
		<div
			onClick={() => { selectCategory(categoryEntry.id); }}
			className={cn(
				"-mx-2 cursor-pointer rounded-[var(--radius-md)] px-2 py-2 hover:bg-secondary",
				active && "bg-secondary",
			)}
		>
			<CategoryHeader label={categoryEntry.label} color={color} totalFormatted={totalFormatted}/>
			<CompositionBar>
				{segments.map((segment) => (
					<CategorySegmentBlock
						key={segment.accountId}
						color={color}
						width={segment.width}
						shade={segment.shade}
						title={segment.name}
						selected={active && segment.accountId === selectedAccountId}
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
