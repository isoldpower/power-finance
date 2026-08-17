import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type RuleDialogDescriptionProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>
>;

const RuleDialogDescription: FC<RuleDialogDescriptionProps> = ({
	children,
	...props
}) => (
	<BodyText size="13" leading="relaxed" className="mt-1.5" {...props}>
		{children}
	</BodyText>
);

RuleDialogDescription.displayName = 'RuleDialogDescription';

export { RuleDialogDescription };
export type { RuleDialogDescriptionProps };
