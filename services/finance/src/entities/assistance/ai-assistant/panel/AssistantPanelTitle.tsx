import { CardTitle } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPanelTitleProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLHeadingElement>, 'className'>>;

const AssistantPanelTitle: FC<AssistantPanelTitleProps> = ({
	children,
	...props
}) => (
	<CardTitle as="h2" {...props}>
		{children}
	</CardTitle>
);

AssistantPanelTitle.displayName = 'AssistantPanelTitle';

export { AssistantPanelTitle };
export type { AssistantPanelTitleProps };
