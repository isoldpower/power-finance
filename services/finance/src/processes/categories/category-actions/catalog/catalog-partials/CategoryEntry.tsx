import { FinanceIconButton, Icons } from "@internal/ui-library";
import { CategoryRow } from "@entity/categories";
import { DeleteCategoryModal, RenameCategoryModal } from "@widget/categories";

import type { FC } from "react";
import type { Category } from "@entity/categories";


interface CategoryEntryProps {
	category: Category;
}

const CategoryEntry: FC<CategoryEntryProps> = ({ category }) => (
	<CategoryRow pending={category.pending}>
		<CategoryRow.Name>
			{category.name}
		</CategoryRow.Name>
		<CategoryRow.Controls>
			<RenameCategoryModal category={category}>
				<FinanceIconButton aria-label={`Rename ${category.name}`} disabled={category.pending}>
					<Icons.Pencil size={14} />
				</FinanceIconButton>
			</RenameCategoryModal>
			<DeleteCategoryModal category={category}>
				<FinanceIconButton
					aria-label={`Delete ${category.name}`}
					disabled={category.pending}
					className="border-[var(--neg-soft)] text-neg hover:bg-neg-soft hover:text-neg"
				>
					<Icons.Trash2 size={14} />
				</FinanceIconButton>
			</DeleteCategoryModal>
		</CategoryRow.Controls>
	</CategoryRow>
);

CategoryEntry.displayName = 'CategoryEntry';

export { CategoryEntry };
export type { CategoryEntryProps };
