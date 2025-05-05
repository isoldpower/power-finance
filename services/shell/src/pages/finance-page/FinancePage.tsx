import { FinanceMFModule } from "@widget/remotes";

function FinancePage() {
	return (
		<div className="flex flex-col items-stretch gap-10 min-h-screen">
			<FinanceMFModule />
		</div>
	)
}

export { FinancePage };
export default FinancePage;