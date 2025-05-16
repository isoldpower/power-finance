import type { FC } from "react";

import { DashboardHeading, GlobalContainer } from "@entity/analytics";
import { ConfigurableGrid, ConfigurableGridPlate, ConfigurableGridRow, SpendingTrendsLinearGraph } from "@widget/analytics";
import { SpendingTrendsThresholdGraph } from "@src/widgets/analytics/spending-trends/SpendingTrendsThresholdGraph";


const DashboardPage: FC = () => {
    return (
        <GlobalContainer>
            <div className="mt-8">
                <DashboardHeading
                    heading="Dashboard"
                    text="Straightforward way to track your expenses"
                />
                <ConfigurableGrid>
                    <ConfigurableGridRow>
                        <ConfigurableGridPlate basis="60%">
                            <SpendingTrendsLinearGraph height={400} />
                        </ConfigurableGridPlate>
                        <ConfigurableGridPlate basis="40%">
                            <SpendingTrendsThresholdGraph height={400} />
                        </ConfigurableGridPlate>
                    </ConfigurableGridRow>
                    <ConfigurableGridRow>
                        <ConfigurableGridPlate basis="100%">
                            <SpendingTrendsLinearGraph height={400} />
                        </ConfigurableGridPlate>
                    </ConfigurableGridRow>
                </ConfigurableGrid>
            </div>
        </GlobalContainer>
    );
}

export { DashboardPage };
export default DashboardPage;