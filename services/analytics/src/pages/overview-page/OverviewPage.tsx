import { PageContainer, RevealMotion, TwoColumnsContainer } from "@internal/shared";
import { AnalyticsPageHeader } from "@process/filters";
import { InsightsWithFx, KpisWithFx } from "@process/overview";
import { CashFlowCardWithFx, PaceCardWithFx } from "@process/flow";
import { CategoryBreakdownCardWithFx } from "@process/spending";

import type { FC } from "react";


const OverviewPage: FC = () => (
	<PageContainer>
		<RevealMotion delay={0.05}>
			<AnalyticsPageHeader title="Overview" />
		</RevealMotion>
		<KpisWithFx />
		<InsightsWithFx />
		<RevealMotion delay={0.1}>
			<CashFlowCardWithFx />
		</RevealMotion>
		<RevealMotion delay={0.15}>
			<TwoColumnsContainer>
				<CategoryBreakdownCardWithFx compact className="h-full" />
				<PaceCardWithFx className="h-full" />
			</TwoColumnsContainer>
		</RevealMotion>
	</PageContainer>
);

OverviewPage.displayName = 'OverviewPage';

export { OverviewPage };
