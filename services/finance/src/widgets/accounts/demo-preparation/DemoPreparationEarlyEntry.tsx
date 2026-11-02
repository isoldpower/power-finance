import { FinanceButton } from "@internal/ui-library";
import { DemoPreparationScreen } from "@entity/accounts";
import { useGuestDemoEarlyEntry } from "@feature/accounts";

import type { FC } from "react";


const DemoPreparationEarlyEntry: FC = () => {
	const { available, enter } = useGuestDemoEarlyEntry();

	return available && (
		<>
			<DemoPreparationScreen.Notice>
				Your sample data is ready, but search is still being indexed. If you continue now,
				search results and filtered lists may be incomplete or change for a few more seconds.
				<DemoPreparationScreen.Actions>
					<FinanceButton type="button" variant="danger" onClick={enter}>
						Continue to dashboard
					</FinanceButton>
				</DemoPreparationScreen.Actions>
			</DemoPreparationScreen.Notice>
		</>
	);
};

DemoPreparationEarlyEntry.displayName = 'DemoPreparationEarlyEntry';

export { DemoPreparationEarlyEntry };
