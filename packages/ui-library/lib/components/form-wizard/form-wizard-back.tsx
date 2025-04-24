import { useCallback } from "react";
import type {ButtonHTMLAttributes, FC, ReactElement } from "react";

import { useFormWizardContext } from "./context/context.ts";
import { cloneElement } from "react";


interface FormWizardBackProps {
	children: ReactElement<{ onClick: () => void, type: ButtonHTMLAttributes<unknown>['type'] }>;
}

const FormWizardBack: FC<FormWizardBackProps> = ({ children }) => {
	const { stepBack } = useFormWizardContext();

	const handleClick = useCallback(() => {
		stepBack();
	}, [stepBack]);

	return cloneElement(children, {
		...children.props as object,
		onClick: handleClick,
		type: "button"
	})
}

FormWizardBack.displayName = 'FormWizardBack';

export { FormWizardBack };
export type { FormWizardBackProps };