import { DemoPreparation } from "@process/accounts";
import { FinanceBackground } from "@widget/navigation";

import type { FC } from "react";


const DemoPreparationPage: FC = () => (
	<div className="finance-theme relative min-h-screen bg-background text-foreground">
		<FinanceBackground />
		<DemoPreparation />
	</div>
);

DemoPreparationPage.displayName = 'DemoPreparationPage';

export { DemoPreparationPage };
