import { useCallback } from "react";
import { cn, FinanceButton } from "@internal/ui-library";
import { Heading, Text } from "@internal/shared";
import { useDeleteCategory } from "@feature/categories";
import { ConfirmModal } from "@shared/overlays";
import { DangerIconBadge } from "@shared/pure-components/badges";

import type { FC, ReactNode } from "react";
import type { Category } from "@entity/categories";


interface DeleteCategoryModalProps {
	category: Category;
	children: ReactNode;
}

const DeleteCategoryModal: FC<DeleteCategoryModalProps> = ({ category, children }) => {
	const deleteCategory = useDeleteCategory(category.id);

	const confirmation = `Delete “${category.name}”? It leaves the pickers, `
		+ `but ${category.kind}s that already use it keep showing it.`;

	const handleConfirm = useCallback((close: () => void) => {
		deleteCategory.mutate(undefined, { onSuccess: close });
	}, [deleteCategory]);

	return (
		<ConfirmModal trigger={children} className="w-[400px] p-6 text-center">
			{({ close }) => (
				<div className="flex flex-col items-center gap-3">
					<DangerIconBadge className="size-12" iconSize={22} />
					<Heading>
						Delete category
					</Heading>
					<Text as="p" size="13" tone="muted">
						{confirmation}
					</Text>
					<div className="mt-2 flex w-full gap-2">
						<FinanceButton type="button" size="lg" variant="outline" className="flex-1" onClick={close}>
							Keep
						</FinanceButton>
						<FinanceButton
							type="button"
							size="lg"
							variant="danger"
							className={cn(
								"flex-1 border-transparent bg-neg text-white",
								"shadow-[var(--shadow)] hover:bg-neg hover:brightness-95"
							)}
							disabled={deleteCategory.isPending}
							onClick={() => { handleConfirm(close); }}
						>
							{deleteCategory.isPending ? 'Deleting...' : 'Delete category'}
						</FinanceButton>
					</div>
				</div>
			)}
		</ConfirmModal>
	);
};

DeleteCategoryModal.displayName = 'DeleteCategoryModal';

export { DeleteCategoryModal };
export type { DeleteCategoryModalProps };
