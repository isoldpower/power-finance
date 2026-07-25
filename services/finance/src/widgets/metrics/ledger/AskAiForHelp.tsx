import { RouteLink } from "@feature/navigation";
import { CenteredList } from "@shared/components";
import { FinanceBadge } from "@internal/ui-library";

import type { FC } from "react";


interface AskAiForHelpProps {
	reason: string;
}

const AskAiForHelp: FC<AskAiForHelpProps> = ({ reason }) => (
	<CenteredList gap={1}>
		Consult
		<RouteLink to="planning">
			<FinanceBadge tone="pos">
				<div className="flex gap-1 hover:gap-2 text-primary-foreground">
					<span>AI</span>
					<span>→</span>
				</div>
			</FinanceBadge>
		</RouteLink>
		if {reason}
	</CenteredList>
);

export { AskAiForHelp };