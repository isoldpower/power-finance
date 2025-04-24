import type { ComponentProps, FC, ReactNode } from "react";
import classes from './Form.module.css';
import { cn } from "@shared/lib";
import { Button } from "@internal/ui-library";

interface FormButtonProps extends ComponentProps<typeof Button> {
	children: ReactNode;
}

const FormButton: FC<FormButtonProps> = ({ children, className, ...props }) => {
	return (
		<Button
			className={cn(
				classes.recoveryForm__button,
				className,
				'flex items-center justify-center gap-2 py-1.5 px-3 text-center',
				'bg-sidebar-primary text-sidebar-primary-foreground'
			)}
			{...props}
		>
			{children}
		</Button>
	);
};

FormButton.displayName = 'FormButton';

export { FormButton };
export type { FormButtonProps };