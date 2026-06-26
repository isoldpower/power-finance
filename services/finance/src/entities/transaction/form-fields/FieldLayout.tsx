import { UiFormItem, UiFormLabel, UiFormControl, UiFormMessage, UiFormDescription, cn } from "@internal/ui-library"
import type { FC, ReactNode } from "react";

interface FieldLayoutProps {
	label: string;
	children?: ReactNode;
	description?: string;
	className?: string;
}

const FieldLayout: FC<FieldLayoutProps> = ({ label, children, description, className }) => {
	return (
		<UiFormItem className={cn(
			'flex flex-col',
			className
		)}>
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