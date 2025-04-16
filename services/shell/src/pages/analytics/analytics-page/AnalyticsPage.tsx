import {AnalyticsLoadingFx} from "@feature/analytics";
import {lazy} from "react";

const AnalyticsPageLazy = lazy(() => import('analytics/remote-app'));

export const AnalyticsPage = () => {
	return (
		<AnalyticsLoadingFx>
			<AnalyticsPageLazy />
		</AnalyticsLoadingFx>
	)
}