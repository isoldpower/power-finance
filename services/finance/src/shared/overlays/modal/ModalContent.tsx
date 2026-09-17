import { cn, UiDialogContent } from "@internal/ui-library";

import type { ComponentProps, FC } from "react";


type ModalContentProps = ComponentProps<typeof UiDialogContent>;

const ModalContent: FC<ModalContentProps> = ({ className, children, ...props }) => (
	<UiDialogContent
		className={cn(
			"finance-theme gap-5 rounded-[var(--radius-lg)] border-border bg-card p-5",
			"text-foreground shadow-[var(--shadow-lg)]",
			className
		)}
		{...props}
	>
		{children}
	</UiDialogContent>
);

ModalContent.displayName = 'ModalContent';

export { ModalContent };
export type { ModalContentProps };
