import { PageContainer, RevealMotion } from "@internal/shared";
import { AnalyticsPageHeader } from "@process/filters";
import { MoneyFlowCardWithFx, BalanceHistoryCardWithFx, SurplusCardWithFx } from "@process/flow";

import type { FC } from "react";


const FlowPage: FC = () => (
	<PageContainer>
		<RevealMotion delay={0.05}>
			<AnalyticsPageHeader title="Money flow" />
		</RevealMotion>
		<RevealMotion delay={0.1}>
			<MoneyFlowCardWithFx />
		</RevealMotion>
		<RevealMotion delay={0.15}>
			<BalanceHistoryCardWithFx />
		</RevealMotion>
		<RevealMotion delay={0.2}>
			<SurplusCardWithFx />
		</RevealMotion>
	</PageContainer>
);

FlowPage.displayName = 'FlowPage';

export { FlowPage };
