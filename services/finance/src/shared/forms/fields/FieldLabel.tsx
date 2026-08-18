import { Caption } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface FieldLabelProps {
	children: ReactNode;
	htmlFor?: string;
}

const FieldLabel: FC<FieldLabelProps> = ({ children, htmlFor }) => (
	<Caption as="label" size="11.5" htmlFor={htmlFor} className="mb-1.5 block">{children}</Caption>
);

FieldLabel.displayName = 'FieldLabel';

export { FieldLabel };
export type { FieldLabelProps };
