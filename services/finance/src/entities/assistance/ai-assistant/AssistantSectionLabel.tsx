
import type { BaseHTMLAttributes, FC } from "react";
import { MetaText } from "@shared/pure-components/typography";


const AssistantSectionLabel: FC<Omit<BaseHTMLAttributes<HTMLDivElement>, 'className'>> = ({
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
