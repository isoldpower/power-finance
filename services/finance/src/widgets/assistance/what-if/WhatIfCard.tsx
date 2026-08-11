import { FinanceBadge } from "@internal/ui-library";
import { WhatIf } from "@entity/assistance";
import { BodyText, RowTitle, Text } from "@shared/pure-components/typography";

import type { FC } from "react";


const WhatIfCard: FC = () => {
	return (
		<WhatIf.Container>
			<WhatIf.Head>
				<WhatIf.Icon />
				<RowTitle as="h2" size="14.5">
					Draft / What-if mode
				</RowTitle>
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
				<BodyText as="span" size="12.5">
					“Cut dining by $150/mo” → Emergency fund
					<Text as="b" tone="positive"> 2 months sooner</Text>
				</BodyText>
			</WhatIf.Example>
			<WhatIf.NotifyButton disabled={true}>
				🔔 Notify me when it ships
			</WhatIf.NotifyButton>
		</WhatIf.Container>
	);
};

WhatIfCard.displayName = 'WhatIfCard';

export { WhatIfCard };
