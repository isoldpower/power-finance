import { InsightCard, InsightGrid, insightAccent } from "@entity/overview";
import { useInsights } from "@feature/overview";
import { DotList } from "@shared/text";
import { INSIGHT_STAGGER_SECONDS } from "./config.ts";

import type { FC } from "react";
import type { Overview } from "@entity/overview";
import type { CategoryBreakdown } from "@entity/spending";


interface InsightsListProps {
	overview: Overview;
	breakdown: CategoryBreakdown;
}

const InsightsList: FC<InsightsListProps> = ({ overview, breakdown }) => {
	const insights = useInsights(overview, breakdown);

	return (
		<InsightGrid>
			{insights.map((insight, index) => (
				<InsightCard
					key={insight.key}
					accentClassName={insightAccent(insight.tone)}
					delay={index * INSIGHT_STAGGER_SECONDS}
				>
					<InsightCard.Title>
						{insight.title}
					</InsightCard.Title>
					<InsightCard.Detail>
						<DotList>
							{insight.detail}
						</DotList>
					</InsightCard.Detail>
				</InsightCard>
			))}
		</InsightGrid>
	);
};

InsightsList.displayName = 'InsightsList';

export { InsightsList };
export type { InsightsListProps };
