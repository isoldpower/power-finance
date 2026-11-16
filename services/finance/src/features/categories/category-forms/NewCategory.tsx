import { useCallback } from "react";
import { useCreateCategory } from "../data-presenters";
import { reportNameConflict } from "./form-partials/name-conflict.ts";

import type { FormEvent, ReactNode } from "react";
import type { UseFormHandleSubmit, UseFormSetError } from "react-hook-form";
import type { Category, CategoryKind } from "@entity/categories";
import type { CategoryNameSchema } from "./schemas.ts";


interface NewCategoryProps {
	kind: CategoryKind;
	handleSubmit: UseFormHandleSubmit<CategoryNameSchema>;
	setError: UseFormSetError<CategoryNameSchema>;
	onBeforeCreate?: () => void;
	onSuccess?: (category: Category) => void;
	onFailure?: () => void;
	children?: ReactNode;
}

function NewCategory({
	kind,
	handleSubmit,
	setError,
	onBeforeCreate,
	onSuccess,
	onFailure,
	children,
}: NewCategoryProps) {
	const { create } = useCreateCategory();

	const onSubmit = useCallback(async (data: CategoryNameSchema) => {
		if (onBeforeCreate) {
			onBeforeCreate();
		}

		try {
			const created = await create({ 
				kind,
				name: data.name
			});

			if (onSuccess) {
				onSuccess(created.category);
			}
		} catch (error: unknown) {
			reportNameConflict(error, setError);

			if (onFailure) {
				onFailure();
			}
		}
	}, [create, kind, onBeforeCreate, onFailure, onSuccess, setError]);

	const handleSubmitForm = useCallback((event: FormEvent<HTMLFormElement>) => {
		void handleSubmit(onSubmit)(event);
	}, [handleSubmit, onSubmit]);

	return (
		<form onSubmit={handleSubmitForm}>
			{children}
		</form>
	);
}

NewCategory.displayName = 'NewCategory';

export { NewCategory };
export type { NewCategoryProps };
