import { Caption } from "@shared/pure-components/typography";

import type { FC, ReactNode } from "react";


interface ProtectNoConditionsProps {
	conditions: unknown[];
	children: ReactNode;
}

const ProtectNoConditions: FC<ProtectNoConditionsProps> = ({ conditions, children }) => {
	return conditions.length === 0 ? (
		<Caption size="12">
			{'No conditions yet — the rule runs every time the trigger fires.'}
		</Caption>
	) : children;
}

export { ProtectNoConditions };