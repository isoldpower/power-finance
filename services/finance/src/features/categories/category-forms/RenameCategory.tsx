import { useCallback } from "react";
import { useRenameCategory } from "../data-presenters";
import { reportNameConflict } from "./form-partials/name-conflict.ts";

import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import type { Category } from "@entity/categories";
import type { CategoryNameSchema } from "./schemas.ts";


interface RenameCategoryProps {
	categoryId: string;
	handleSubmit: UseFormHandleSubmit<CategoryNameSchema>;
	setError: UseFormSetError<CategoryNameSchema>;
	onBeforeRename?: () => void;
	onSuccess?: (category: Category) => void;
	onFailure?: () => void;
	children?: ReactNode;
}

function RenameCategory({
	categoryId,
	handleSubmit,
	setError,
	onBeforeRename,
	onSuccess,
	onFailure,
	children,
}: RenameCategoryProps) {
	const renameCategory = useRenameCategory(categoryId);

	const onSubmit = useCallback(async (data: CategoryNameSchema) => {
		if (onBeforeRename) {
			onBeforeRename();
		}

		try {
			const renamed = await renameCategory.mutateAsync({ 
				name: data.name
			});

			if (onSuccess) {
				onSuccess(renamed);
			}
		} catch (error: unknown) {
			reportNameConflict(error, setError);

			if (onFailure) {
				onFailure();
			}
		}
	}, [renameCategory, onBeforeRename, onFailure, onSuccess, setError]);

	const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
		void handleSubmit(onSubmit)(event);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

RenameCategory.displayName = 'RenameCategory';

export { RenameCategory };
export type { RenameCategoryProps };
