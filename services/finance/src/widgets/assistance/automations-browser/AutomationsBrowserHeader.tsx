import { AutomationsToolbar } from "@entity/assistance";
import { AiBadge, SpaceOccupant } from "@shared/components";

import type { FC, ReactNode } from "react";


interface AutomationsBrowserHeaderProps {
	children: ReactNode;
}

const AutomationsBrowserHeader: FC<AutomationsBrowserHeaderProps> = ({ children }) => {
	return (
		<AutomationsToolbar.Container>
			<AutomationsToolbar.Title>
				Automations &amp; rules
			</AutomationsToolbar.Title>
			<AiBadge />
			<SpaceOccupant />
			{children}
		</AutomationsToolbar.Container>
	);
}

export { AutomationsBrowserHeader };
export type { AutomationsBrowserHeaderProps };
