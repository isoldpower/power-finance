import {ModuleTitle} from "@entity/analytics";
import {AnalyticsMFModule} from "@widget/analytics";

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
			<ModuleTitle>
				<ModuleTitle.Highlight addSpace>
					Analytics
				</ModuleTitle.Highlight>
				Micro-Frontend Remote
			</ModuleTitle>
			<AnalyticsMFModule />
		</div>
	)
}

export { AnalyticsPage };
export default AnalyticsPage;