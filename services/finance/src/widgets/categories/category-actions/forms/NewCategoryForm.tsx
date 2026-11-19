import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UiForm } from "@internal/ui-library";
import { NewCategory, categoryNameSchema, useCategoryNameDefaults } from "@feature/categories";
import { CategoryNameFields } from "./form-partials/CategoryNameFields.tsx";

import type { FC } from "react";
import type { Category, CategoryKind } from "@entity/categories";
import type { CategoryNameSchema } from "@feature/categories";


interface NewCategoryFormProps {
	kind: CategoryKind;
	onCreated?: (category: Category) => void;
	onCancel?: () => void;
}

const NewCategoryForm: FC<NewCategoryFormProps> = ({ kind, onCreated, onCancel }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const defaultValues = useCategoryNameDefaults();
	const form = useForm<CategoryNameSchema>({
		defaultValues,
		resolver: zodResolver(categoryNameSchema),
	});

	const handleLoading = useCallback(() => {
		setLoading(true);
	}, []);

	const handleFailure = useCallback(() => {
		setLoading(false);
	}, []);

	const handleSuccess = useCallback((category: Category) => {
		setLoading(false);
		form.reset();
		onCreated?.(category);
	}, [form, onCreated]);

	return (
		<UiForm {...form}>
			<NewCategory
				kind={kind}
				handleSubmit={form.handleSubmit}
				setError={form.setError}
				onBeforeCreate={handleLoading}
				onSuccess={handleSuccess}
				onFailure={handleFailure}
			>
				<CategoryNameFields
					control={form.control}
					loading={loading}
					submitLabel={loading ? 'Creating…' : 'Create category'}
					onCancel={onCancel}
				/>
			</NewCategory>
		</UiForm>
	);
};

NewCategoryForm.displayName = 'NewCategoryForm';

export { NewCategoryForm };
export type { NewCategoryFormProps };
