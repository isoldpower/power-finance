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
	CategoryBasedGraphsSet
} from "@widget/analytics";


const DashboardPage: FC = () => {
    return (
        <GlobalContainer>
            <div className="mt-8">
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
									}} />
							</ConfigurableGridPlate>
						</ConfigurableGridRow>
						<ConfigurableGridRow>
							<ConfigurableGridPlate basis="100%">
								<div>Sankey Chart</div>
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