import type { BaseHTMLAttributes, FC } from "react";

import { BodyText } from "@shared/pure-components/typography";


const GoalDialogDescription: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<BodyText
		size="13"
		leading="relaxed"
		className="mt-1"
		{...props}
	>
		{children}
	</BodyText>
);

GoalDialogDescription.displayName = 'GoalDialogDescription';

export { GoalDialogDescription };
