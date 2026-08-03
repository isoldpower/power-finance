import { RouteLink } from "@feature/navigation";
import { CenteredList } from "@shared/components";
import { ForwardIcon } from "@entity/transactions";

import type { FC } from "react";


interface AskAiForHelpProps {
	reason: string;
}

const AskAiForHelp: FC<AskAiForHelpProps> = ({ reason }) => (
	<CenteredList gap={1}>
		Consult
		<RouteLink to="planning">
			<div className="underline flex items-center gap-1 group text-primary-foreground">
				<span>AI</span>
				<span className="group-hover:translate-x-0.5">
					<ForwardIcon size={12} />
				</span>
			</div>
		</RouteLink>
		if {reason}
	</CenteredList>
);

export { AskAiForHelp };