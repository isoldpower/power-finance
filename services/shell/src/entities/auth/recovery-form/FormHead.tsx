import type {FC, ReactNode} from "react";

interface FormHeadProps {
	children: ReactNode;
}

const FormHead: FC<FormHeadProps> = ({ children }) => {
	return (
		<div className="flex flex-col items-center gap-6 text-center">
			{children}
		</div>
	);
};

FormHead.displayName = 'FormHead';

export { FormHead };
export type { FormHeadProps };