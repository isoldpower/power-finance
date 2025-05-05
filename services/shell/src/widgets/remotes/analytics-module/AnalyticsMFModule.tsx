import type {FC} from "react";
import {lazy} from "react";

import {RemoteLoadingFx} from "@feature/remotes";

interface AnalyticsMFModuleProps {
}

const AnalyticsRemoteApp = lazy(() => import('analytics/remote-app'));

const AnalyticsMFModule: FC<AnalyticsMFModuleProps> = ({}) => {
	return (
		<RemoteLoadingFx>
			<AnalyticsRemoteApp />
		</RemoteLoadingFx>
	)
}

AnalyticsMFModule.displayName = 'AnalyticsMFModule';

export { AnalyticsMFModule };
export type { AnalyticsMFModuleProps };
