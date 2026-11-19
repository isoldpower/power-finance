import { AutomationsToolbar } from "@entity/assistance";
import { AiBadge } from "@shared/pure-components/badges";
import { CardTitle, SpaceOccupant } from "@internal/shared";

import type { FC, ReactNode } from "react";


interface AutomationsBrowserHeaderProps {
	children: ReactNode;
}

const AutomationsBrowserHeader: FC<AutomationsBrowserHeaderProps> = ({ children }) => {
	return (
		<AutomationsToolbar>
			<CardTitle as="h2">
				Automations &amp; rules
			</CardTitle>
			<AiBadge />
			<SpaceOccupant />
			{children}
		</AutomationsToolbar>
	);
}

export { AutomationsBrowserHeader };
export type { AutomationsBrowserHeaderProps };
