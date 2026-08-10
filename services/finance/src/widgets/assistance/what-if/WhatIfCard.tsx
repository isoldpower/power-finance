import { FinanceBadge } from "@internal/ui-library";
import { WhatIf } from "@entity/assistance";

import type { FC } from "react";


const WhatIfCard: FC = () => {
	return (
		<WhatIf.Container>
			<WhatIf.Head>
				<WhatIf.Icon />
				<WhatIf.Title>
					Draft / What-if mode
				</WhatIf.Title>
				<FinanceBadge tone="warn" appearance="soft" size="sm">
					SOON
				</FinanceBadge>
			</WhatIf.Head>
			<WhatIf.Description>
				Branch your finances into a sandbox: change incomes, expenses or goals and watch runway,
				savings rate and goal ETAs update — without touching real data.
			</WhatIf.Description>
			<WhatIf.Example>
				<FinanceBadge tone="accent" appearance="soft" size="sm">
					EXAMPLE
				</FinanceBadge>
				<WhatIf.ExampleText>
					“Cut dining by $150/mo” → Emergency fund
					<WhatIf.Highlight> 2 months sooner</WhatIf.Highlight>
				</WhatIf.ExampleText>
			</WhatIf.Example>
			<WhatIf.NotifyButton disabled={true}>
				🔔 Notify me when it ships
			</WhatIf.NotifyButton>
		</WhatIf.Container>
	);
};

WhatIfCard.displayName = 'WhatIfCard';

export { WhatIfCard };
