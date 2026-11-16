import { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UiForm } from "@internal/ui-library";
import { RenameCategory, categoryNameSchema, useCategoryNameDefaults } from "@feature/categories";
import { CategoryNameFields } from "./form-partials/CategoryNameFields.tsx";

import type { FC } from "react";
import type { Category } from "@entity/categories";
import type { CategoryNameSchema } from "@feature/categories";


interface RenameCategoryFormProps {
	category: Category;
	onRenamed?: (category: Category) => void;
	onCancel?: () => void;
}

const RenameCategoryForm: FC<RenameCategoryFormProps> = ({ category, onRenamed, onCancel }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const defaultValues = useCategoryNameDefaults(category);
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

	const handleSuccess = useCallback((renamed: Category) => {
		setLoading(false);
		onRenamed?.(renamed);
	}, [onRenamed]);

	return (
		<UiForm {...form}>
			<RenameCategory
				categoryId={category.id}
				handleSubmit={form.handleSubmit}
				setError={form.setError}
				onBeforeRename={handleLoading}
				onSuccess={handleSuccess}
				onFailure={handleFailure}
			>
				<CategoryNameFields
					control={form.control}
					loading={loading}
					submitLabel={loading ? 'Saving…' : 'Save name'}
					onCancel={onCancel}
				/>
			</RenameCategory>
		</UiForm>
	);
};

RenameCategoryForm.displayName = 'RenameCategoryForm';

export { RenameCategoryForm };
export type { RenameCategoryFormProps };
