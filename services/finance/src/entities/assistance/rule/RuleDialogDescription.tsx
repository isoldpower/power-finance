import type { BaseHTMLAttributes, FC } from "react";

import { BodyText } from "@shared/pure-components/typography";


const RuleDialogDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<BodyText
		size="13"
		leading="relaxed"
		className="mt-1.5"
		{...props}
	>
		{children}
	</BodyText>
);

RuleDialogDescription.displayName = 'RuleDialogDescription';

export { RuleDialogDescription };
