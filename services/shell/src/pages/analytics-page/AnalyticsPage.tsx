import {AnalyticsMFModule} from "@widget/remotes";
import {ErrorBoundary} from "react-error-boundary";

function AnalyticsPage() {
	return (
		<div className="flex flex-col items-stretch gap-10 min-h-screen">
			<ErrorBoundary fallback={<div>Failed loading analytics module</div>}>
				<AnalyticsMFModule />
			</ErrorBoundary>
		</div>
	)
}

export { AnalyticsPage };
export default AnalyticsPage;