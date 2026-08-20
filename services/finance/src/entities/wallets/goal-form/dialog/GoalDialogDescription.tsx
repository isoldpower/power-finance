import { BodyText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type GoalDialogDescriptionProps = PropsWithChildren<
	Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>
>;

const GoalDialogDescription: FC<GoalDialogDescriptionProps> = ({
	children,
	...props
}) => (
	<BodyText size="13" leading="relaxed" className="mt-1" {...props}>
		{children}
	</BodyText>
);

GoalDialogDescription.displayName = 'GoalDialogDescription';

export { GoalDialogDescription };
export type { GoalDialogDescriptionProps };
