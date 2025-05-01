import { FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@internal/ui-library"
import type { FC, ReactNode } from "react";

interface FieldLayoutProps {
	label: string;
	children?: ReactNode;
	description?: string;
}

const FieldLayout: FC<FieldLayoutProps> = ({ label, children, description }) => {
	return (
		<FormItem>
			<FormLabel>
				{label}
			</FormLabel>
			<FormControl>
				{children}
			</FormControl>
			{description && (
				<FormDescription>
					{description}
				</FormDescription>
			)}
			<FormMessage />
		</FormItem>
	)
}

FieldLayout.displayName = 'FieldLayout';

export { FieldLayout };
export type { FieldLayoutProps };