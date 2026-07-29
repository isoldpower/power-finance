import { UiFormItem, UiFormLabel, UiFormControl, UiFormMessage, UiFormDescription } from "@internal/ui-library"
import type { FC, ReactNode } from "react";


interface FieldLayoutProps {
	label: string;
	children?: ReactNode;
	description?: string;
}

const FieldLayout: FC<FieldLayoutProps> = ({ label, children, description }) => {
	return (
		<UiFormItem>
			<UiFormLabel>
				{label}
			</UiFormLabel>
			<UiFormControl>
				{children}
			</UiFormControl>
			{description && (
				<UiFormDescription>
					{description}
				</UiFormDescription>
			)}
			<UiFormMessage />
		</UiFormItem>
	)
}

FieldLayout.displayName = 'FieldLayout';

export { FieldLayout };
export type { FieldLayoutProps };