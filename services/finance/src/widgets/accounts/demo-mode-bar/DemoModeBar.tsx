import { useCallback } from "react";
import { FinanceButton } from "@internal/ui-library";
import { DemoModeBanner } from "@entity/accounts";
import { useGuestDemoMode } from "@feature/accounts";

import { DEMO_MODE_MESSAGES, DEMO_MODE_TAG, RELOAD_LABEL } from "./config.ts";

import type { FC } from "react";


const DemoModeBar: FC = () => {
	const phase = useGuestDemoMode();

	const handleReload = useCallback(() => {
		window.location.reload();
	}, []);

	return (phase !== 'inactive') && (
		<DemoModeBanner>
			<DemoModeBanner.Tag>{DEMO_MODE_TAG}</DemoModeBanner.Tag>
			<DemoModeBanner.Message>{DEMO_MODE_MESSAGES[phase]}</DemoModeBanner.Message>
			{phase === 'indexed' && (
				<DemoModeBanner.Action>
					<FinanceButton type="button" size="sm" variant="outline" onClick={handleReload}>
						{RELOAD_LABEL}
					</FinanceButton>
				</DemoModeBanner.Action>
			)}
		</DemoModeBanner>
	);
};

DemoModeBar.displayName = 'DemoModeBar';

export { DemoModeBar };
