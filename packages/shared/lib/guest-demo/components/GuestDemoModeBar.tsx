import { useCallback } from "react";

import { useGuestDemoMode } from "../preparation/index.ts";
import { DemoModeBanner } from "./mode-banner/index.ts";
import { DEMO_MODE_MESSAGES, DEMO_MODE_TAG } from "./config.ts";

import type { FC, ReactNode } from "react";


interface GuestDemoModeBarProps {
	renderReload: (reload: () => void) => ReactNode;
}

const GuestDemoModeBar: FC<GuestDemoModeBarProps> = ({ renderReload }) => {
	const phase = useGuestDemoMode();

	const handleReload = useCallback(() => {
		window.location.reload();
	}, []);

	if (phase === 'inactive') {
		return null;
	}

	return (
		<DemoModeBanner>
			<DemoModeBanner.Tag>
				{DEMO_MODE_TAG}
			</DemoModeBanner.Tag>
			<DemoModeBanner.Message>
				{DEMO_MODE_MESSAGES[phase]}
			</DemoModeBanner.Message>
			{phase === 'indexed' ? (
				<DemoModeBanner.Action>
					{renderReload(handleReload)}
				</DemoModeBanner.Action>
			) : null}
		</DemoModeBanner>
	);
};

GuestDemoModeBar.displayName = 'GuestDemoModeBar';

export { GuestDemoModeBar };
export type { GuestDemoModeBarProps };
