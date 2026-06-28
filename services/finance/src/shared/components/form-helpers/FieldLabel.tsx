import type { FC, ReactNode } from "react";

interface FieldLabelProps {
	children: ReactNode;
	htmlFor?: string;
}

// Small muted form-field label, shared by the redesign panels/forms.
const FieldLabel: FC<FieldLabelProps> = ({ children, htmlFor }) => (
	<label htmlFor={htmlFor} className="mb-1.5 block text-[11.5px] text-text-3">{children}</label>
);

FieldLabel.displayName = 'FieldLabel';

export { FieldLabel };
export type { FieldLabelProps };
