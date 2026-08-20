import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalFormIntroProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>>;

const GoalFormIntro: FC<GoalFormIntroProps> = ({
	children,
	...props
}) => (
	<BodyText size="12.5" leading="relaxed" className="mb-5" {...props}>
		{children}
	</BodyText>
);

GoalFormIntro.displayName = 'GoalFormIntro';

export { GoalFormIntro };
export type { GoalFormIntroProps };
