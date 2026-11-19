import { PageContainer, RevealMotion, TwoColumnsContainer } from "@internal/shared";
import { AnalyticsPageHeader } from "@process/filters";
import {
	CategoryBreakdownCardWithFx,
	CategoryTrendsCardWithFx,
	CalendarCardWithFx,
	RhythmCardWithFx,
} from "@process/spending";
import { CounterpartiesCardWithFx } from "@process/transactions";

import type { FC } from "react";


const SpendingPage: FC = () => (
	<PageContainer>
		<RevealMotion delay={0.05}>
			<AnalyticsPageHeader title="Spending" />
		</RevealMotion>
		<RevealMotion delay={0.1}>
			<CategoryBreakdownCardWithFx />
		</RevealMotion>
		<RevealMotion delay={0.15}>
			<CategoryTrendsCardWithFx />
		</RevealMotion>
		<RevealMotion delay={0.2}>
			<TwoColumnsContainer>
				<div className="flex flex-col gap-4">
					<CalendarCardWithFx />
					<RhythmCardWithFx className="flex-1" />
				</div>
				<CounterpartiesCardWithFx className="h-full" />
			</TwoColumnsContainer>
		</RevealMotion>
	</PageContainer>
);

SpendingPage.displayName = 'SpendingPage';

export { SpendingPage };
