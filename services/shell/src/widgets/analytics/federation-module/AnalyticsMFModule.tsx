import type {FC} from "react";
import {lazy} from "react";

import {AnalyticsLoadingFx} from "@feature/analytics";

interface AnalyticsMFModuleProps {
}

const AnalyticsRemoteApp = lazy(() => import('analytics/remote-app'));

const AnalyticsMFModule: FC<AnalyticsMFModuleProps> = ({}) => {
	return (
		<AnalyticsLoadingFx>
			<AnalyticsRemoteApp />
		</AnalyticsLoadingFx>
	)
}

AnalyticsMFModule.displayName = 'AnalyticsMFModule';

export { AnalyticsMFModule };
export type { AnalyticsMFModuleProps };
