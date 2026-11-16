import { Caption } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface FieldLabelRowProps {
	children: ReactNode;
	action: ReactNode;
	htmlFor?: string;
}

const FieldLabelRow: FC<FieldLabelRowProps> = ({ children, action, htmlFor }) => (
	<div className="flex items-center justify-between gap-2">
		<Caption as="label" size="11.5" htmlFor={htmlFor} className="mb-1.5 block">
			{children}
		</Caption>
		<div className="mb-1.5 flex flex-none items-center">
			{action}
		</div>
	</div>
);

FieldLabelRow.displayName = 'FieldLabelRow';

export { FieldLabelRow };
export type { FieldLabelRowProps };
