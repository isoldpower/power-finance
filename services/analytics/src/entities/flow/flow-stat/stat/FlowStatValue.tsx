import { DisplayText } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface FlowStatValueProps {
	children: ReactNode;
}

const FlowStatValue: FC<FlowStatValueProps> = ({ children }) => (
	<DisplayText size="17" leading="1.1" truncate>
		{children}
	</DisplayText>
);

FlowStatValue.displayName = 'FlowStatValue';

export { FlowStatValue };
export type { FlowStatValueProps };
