import type {FC} from "react";
import {lazy} from "react";

import {RemoteLoadingFx} from "@feature/remotes";


const AnalyticsRemoteApp = lazy(() => import('analytics/remote-app'));

const AnalyticsMFModule: FC = () => {
	return (
		<RemoteLoadingFx>
			<AnalyticsRemoteApp />
		</RemoteLoadingFx>
	)
}

AnalyticsMFModule.displayName = 'AnalyticsMFModule';

export { AnalyticsMFModule };
