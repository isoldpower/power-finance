import {AnalyticsMFModule} from "@widget/remotes";
import {ErrorBoundary} from "react-error-boundary";

function AnalyticsPage() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'stretch',
				gap: "40px",
				minHeight: "100dvh"
			}}
		>
			<ErrorBoundary fallback={<div>Failed loading analytics module</div>}>
				<AnalyticsMFModule />
			</ErrorBoundary>
		</div>
	)
}

export { AnalyticsPage };
export default AnalyticsPage;