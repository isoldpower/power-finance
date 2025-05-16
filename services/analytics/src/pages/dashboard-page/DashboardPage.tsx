import type { FC } from "react";

import { DashboardHeading, GlobalContainer } from "@entity/analytics";
import { ConfigurableGrid, ConfigurableGridPlate, SpendingTrendsLinearGraph } from "@widget/analytics";


const DashboardPage: FC = () => {
    return (
        <GlobalContainer>
            <div className="mt-8">
                <DashboardHeading
                    heading="Dashboard"
                    text="Straightforward way to track your expenses"
                />
                <ConfigurableGrid>
                    <ConfigurableGridPlate>
                        <SpendingTrendsLinearGraph />
                    </ConfigurableGridPlate>
                </ConfigurableGrid>
            </div>
        </GlobalContainer>
    );
}

export { DashboardPage };
export default DashboardPage;