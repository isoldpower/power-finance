import type { FC } from "react";

import { DashboardHeading, GlobalContainer } from "@entity/analytics";
import {
	ConfigurationStoreProvider,
	useCategoryData,
	useExpenditureHistory,
	useMoneyFlow
} from "@feature/analytics";
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
	MoneyFlowSankeyChart,
	MoneyFlowGraph
} from "@widget/analytics";


const DashboardPage: FC = () => {
	const { data: categoryData, isLoading: isCategoryLoading } = useCategoryData();
	const { data: expenditureData, isLoading: isExpenditureLoading } = useExpenditureHistory();
	const { data: moneyFlowData, isLoading: isMoneyFlowLoading } = useMoneyFlow();
	
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
										linear: <SpendingTrendsLinearGraph
											data={expenditureData}
											isLoading={isExpenditureLoading}
											height={400} />,
										threshold: <SpendingTrendsThresholdGraph
											data={expenditureData}
											isLoading={isExpenditureLoading}
											height={400} />
									}} />
							</ConfigurableGridPlate>
							<ConfigurableGridPlate basis="40%">
								<CategoryBasedGraphsSet
									graphSet={{
										pie: <CategoryBasedPieChart
											data={categoryData}	
											isLoading={isCategoryLoading} 
											size={400} />,
										radar: <CategoryBasedRadarChart
											data={categoryData}
											isLoading={isCategoryLoading}
											size={400} />,
										radial: <CategoryBasedRadialChart
											data={categoryData}
											isLoading={isCategoryLoading} 
											size={400} />
									}} />
							</ConfigurableGridPlate>
						</ConfigurableGridRow>
						<ConfigurableGridRow>
							<ConfigurableGridPlate basis="100%">
								<MoneyFlowGraph>
									<MoneyFlowSankeyChart
										data={moneyFlowData}
										isLoading={isMoneyFlowLoading}
										height={300}
									/>
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