import { FinanceButton, FinanceInput, UiFormField } from "@internal/ui-library";
import { ShowOn } from "@internal/shared";
import { FieldLayout } from "@shared/forms";

import type { FC } from "react";
import type { Control } from "react-hook-form";
import type { CategoryNameSchema } from "@feature/categories";


interface CategoryNameFieldsProps {
	control: Control<CategoryNameSchema>;
	loading: boolean;
	submitLabel: string;
	onCancel?: () => void;
}

const CategoryNameFields: FC<CategoryNameFieldsProps> = ({ control, loading, submitLabel, onCancel }) => (
	<>
		<UiFormField
			disabled={loading}
			control={control}
			name="name"
			render={({ field }) => (
				<FieldLayout label="Name">
					<FinanceInput placeholder="e.g. Pets" autoFocus {...field} />
				</FieldLayout>
			)}
		/>
		<div className="mt-5 flex justify-end gap-2">
			<ShowOn condition={onCancel !== undefined}>
				<FinanceButton type="button" variant="secondary" disabled={loading} onClick={onCancel}>
					Cancel
				</FinanceButton>
			</ShowOn>
			<FinanceButton type="submit" disabled={loading}>
				{submitLabel}
			</FinanceButton>
		</div>
	</>
);

CategoryNameFields.displayName = 'CategoryNameFields';

export { CategoryNameFields };
export type { CategoryNameFieldsProps };
