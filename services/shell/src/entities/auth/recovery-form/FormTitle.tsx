import type {FC, ReactNode} from "react";

interface FormTitleProps {
	children: ReactNode;
}

const FormTitle: FC<FormTitleProps> = ({ children }) => {
	return (
		<h1 className="font-bold text-[1.0625rem] leading-[1.4] text-center text-sidebar-accent-foreground wrap-break-word">
			{children}
		</h1>
	);
};

FormTitle.displayName = 'FormTitle';

export { FormTitle };
export type { FormTitleProps };