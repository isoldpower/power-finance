import type { FC } from "react";

import { DashboardHeading, GlobalContainer } from "@entity/analytics";
import { ConfigurationStoreProvider } from "@feature/analytics";
import { 
	ConfigurableGrid,
	ConfigurableGridPlate,
	ConfigurableGridRow,
	SpendingTrendsLinearGraph,
	SpendingTrendsThresholdGraph,
	SpendingTrendsGraphsSet,
	CategoryBasedPieChart,
	CategoryBasedRadarChart,
	CategoryBasedGraphsSet,
	CategoryBasedRadialChart,
	MoneyFlowSankeyChart
} from "@widget/analytics";
import { MoneyFlowGraph } from "@src/widgets/analytics/money-flow/MoneyFlowGraph";


const DashboardPage: FC = () => {
    return (
        <GlobalContainer>
            <div className="mt-12">
                <DashboardHeading
                    heading="Dashboard"
                    text="Straightforward way to track your expenses"
                />
                <ConfigurableGrid>
					<ConfigurationStoreProvider initialState={{ graphType: "threshold" }}>
						<ConfigurableGridRow>
							<ConfigurableGridPlate basis="60%">
								<SpendingTrendsGraphsSet
									graphSet={{
										linear: <SpendingTrendsLinearGraph height={400} />,
										threshold: <SpendingTrendsThresholdGraph height={400} />
									}} />
							</ConfigurableGridPlate>
							<ConfigurableGridPlate basis="40%">
								<CategoryBasedGraphsSet
									graphSet={{
										pie: <CategoryBasedPieChart size={400} />,
										radar: <CategoryBasedRadarChart size={400} />,
										radial: <CategoryBasedRadialChart size={400} />
									}} />
							</ConfigurableGridPlate>
						</ConfigurableGridRow>
						<ConfigurableGridRow>
							<ConfigurableGridPlate basis="100%">
								<MoneyFlowGraph>
									<MoneyFlowSankeyChart height={300} />
								</MoneyFlowGraph>
							</ConfigurableGridPlate>
						</ConfigurableGridRow>
					</ConfigurationStoreProvider>
                </ConfigurableGrid>
            </div>
        </GlobalContainer>
    );
}

export { DashboardPage };
export default DashboardPage;