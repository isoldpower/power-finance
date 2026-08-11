import type { BaseHTMLAttributes, FC } from "react";

import { BodyText } from "@shared/pure-components/typography";


const GoalFormIntro: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<BodyText
		size="12.5"
		leading="relaxed"
		className="mb-5"
		{...props}
	>
		{children}
	</BodyText>
);

GoalFormIntro.displayName = 'GoalFormIntro';

export { GoalFormIntro };
