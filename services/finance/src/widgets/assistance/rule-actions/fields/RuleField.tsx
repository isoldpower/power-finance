import { RuleForm } from "@entity/assistance";
import { FieldLabel } from "@shared/forms";

import type { FC, ReactNode } from "react";


interface RuleFieldProps {
	label: string;
	children: ReactNode;
	htmlFor?: string;
	action?: ReactNode;
	error?: string;
}

const RuleField: FC<RuleFieldProps> = ({ label, children, htmlFor, action, error }) => (
	<RuleForm.Section>
		<div className="flex items-center justify-between gap-2">
			<FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
			{action ? (
				<div className="mb-1.5 flex flex-none items-center">
					{action}
				</div>
			) : null}
		</div>
		{children}
		{error ? (
			<RuleForm.FieldError spaced={false}>
				{error}
			</RuleForm.FieldError>
		) : null}
	</RuleForm.Section>
);

RuleField.displayName = 'RuleField';

export { RuleField };
export type { RuleFieldProps };
