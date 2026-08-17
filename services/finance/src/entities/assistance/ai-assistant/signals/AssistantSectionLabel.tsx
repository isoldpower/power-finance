import { MetaText } from "@shared/pure-components/typography";

import type { BaseHTMLAttributes, FC, PropsWithChildren } from "react";


type AssistantSectionLabelProps = PropsWithChildren<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>>;

const AssistantSectionLabel: FC<AssistantSectionLabelProps> = ({
	children,
	...props
}) => (
	<MetaText
		as="div"
		size="9.5"
		tracking="0.1em"
		tone="subtle"
		className="mb-2"
		{...props}
	>
		{children}
	</MetaText>
);

AssistantSectionLabel.displayName = 'AssistantSectionLabel';

export { AssistantSectionLabel };
export type { AssistantSectionLabelProps };
