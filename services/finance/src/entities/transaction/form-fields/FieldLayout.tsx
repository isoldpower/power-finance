import { FormItem, FormLabel, FormControl, FormMessage, FormDescription, cn } from "@internal/ui-library"
import type { FC, ReactNode } from "react";

interface FieldLayoutProps {
	label: string;
	children?: ReactNode;
	description?: string;
	className?: string;
}

const FieldLayout: FC<FieldLayoutProps> = ({ label, children, description, className }) => {
	return (
		<FormItem className={cn(
			'flex flex-col',
			className
		)}>
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