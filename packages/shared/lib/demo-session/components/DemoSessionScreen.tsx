import { FinanceBackground } from "../../pure-components/background/index.ts";
import { DemoPreparationScreen } from "../../guest-demo/components/preparation-screen/index.ts";

import type { FC, ReactNode } from "react";


interface DemoSessionScreenProps {
	heading: string;
	description: string;
	actions?: ReactNode;
}

const DemoSessionScreen: FC<DemoSessionScreenProps> = ({ heading, description, actions }) => (
	<div className="finance-theme relative min-h-screen bg-background text-foreground">
		<FinanceBackground />
		<DemoPreparationScreen>
			<DemoPreparationScreen.Heading>
				{heading}
			</DemoPreparationScreen.Heading>
			<DemoPreparationScreen.Description>
				{description}
			</DemoPreparationScreen.Description>
			{actions}
		</DemoPreparationScreen>
	</div>
);

DemoSessionScreen.displayName = 'DemoSessionScreen';

export { DemoSessionScreen };
export type { DemoSessionScreenProps };
