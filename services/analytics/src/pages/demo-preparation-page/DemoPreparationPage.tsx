import { FinanceBackground, GuestDemoPreparation } from "@internal/shared";
import { FinanceButton } from "@internal/ui-library";

import type { FC } from "react";


const DemoPreparationPage: FC = () => (
	<div className="finance-theme relative min-h-screen bg-background text-foreground">
		<FinanceBackground />
		<GuestDemoPreparation
			renderContinue={(enter) => (
				<FinanceButton type="button" variant="danger" onClick={enter}>
					Continue to analytics
				</FinanceButton>
			)}
		/>
	</div>
);

DemoPreparationPage.displayName = 'DemoPreparationPage';

export { DemoPreparationPage };
