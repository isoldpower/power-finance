import type { ComponentProps, FC, ReactNode } from "react";
import classes from './Form.module.css';
import { cn } from "@shared/lib";
import { UiButton } from "@internal/ui-library";

interface FormButtonProps extends ComponentProps<typeof UiButton> {
	children: ReactNode;
}

const FormButton: FC<FormButtonProps> = ({ children, className, ...props }) => {
	return (
		<UiButton
			className={cn(
				classes.recoveryForm__button,
				className,
				'flex items-center justify-center gap-2 py-1.5 px-3 text-center',
				'bg-sidebar-primary text-sidebar-primary-foreground'
			)}
			{...props}
		>
			{children}
		</UiButton>
	);
};

FormButton.displayName = 'FormButton';

export { FormButton };
export type { FormButtonProps };