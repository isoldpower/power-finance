import { cn } from "@internal/ui-library";

import type { BaseHTMLAttributes, FC } from "react";


const GoalFormIntro: FC<Omit<BaseHTMLAttributes<HTMLParagraphElement>, 'className'>> = ({
	children,
	...props
}) => (
	<p
		className={cn(
			"mb-5 text-[12.5px] leading-relaxed text-text-2"
		)}
		{...props}
	>
		{children}
	</p>
);

GoalFormIntro.displayName = 'GoalFormIntro';

export { GoalFormIntro };
