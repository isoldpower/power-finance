import { DemoPreparationScreen } from "@entity/accounts";
import { DemoPreparationEarlyEntry, DemoPreparationProgress } from "@widget/accounts";

import type { FC } from "react";


const DemoPreparation: FC = () => {
	return (
		<DemoPreparationScreen>
			<DemoPreparationScreen.Heading>
				Preparing your demo
			</DemoPreparationScreen.Heading>
			<DemoPreparationScreen.Description>
				We are populating a sandbox with sample data so you can explore without signing in.
				This only happens once and takes a few seconds.
			</DemoPreparationScreen.Description>
			<DemoPreparationProgress />
		<DemoPreparationEarlyEntry />
		</DemoPreparationScreen>
	);
}

DemoPreparation.displayName = 'DemoPreparation';

export { DemoPreparation };
