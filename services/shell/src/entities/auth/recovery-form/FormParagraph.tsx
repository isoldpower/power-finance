import type {FC, ReactNode} from "react";

interface FormParagraphProps {
	children: ReactNode;
}

const FormParagraph: FC<FormParagraphProps> = ({ children }) => {
	return (
		<p className="text-[0.8125rem] leading-[1.4] text-center wrap-break-word text-sidebar-accent-foreground opacity-65">
			{children}
		</p>
	);
};

FormParagraph.displayName = 'FormParagraph';

export { FormParagraph };
export type { FormParagraphProps };