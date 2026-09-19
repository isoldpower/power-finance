import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantPanelHintProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantPanelHint: FC<AssistantPanelHintProps> = ({
	children,
	...props
}) => (
	<MetaText as="div" size="9.5" {...props}>
		{children}
	</MetaText>
);

AssistantPanelHint.displayName = 'AssistantPanelHint';

export { AssistantPanelHint };
export type { AssistantPanelHintProps };
