import { useAnalyticsQuery } from "@feature/filters";
import { InsightsFx, useInsightSources } from "@feature/overview";
import { InsightsList } from "@widget/overview";

import type { FC } from "react";


const InsightsWithFx: FC = () => {
	const query = useAnalyticsQuery();
	const { sources, isPending, isError } = useInsightSources(query);

	return (
		<InsightsFx
			isPending={isPending}
			isError={isError}
			sources={sources}
		>
			{(loaded) => <InsightsList overview={loaded.overview} breakdown={loaded.breakdown} />}
		</InsightsFx>
	);
};

InsightsWithFx.displayName = 'InsightsWithFx';

export { InsightsWithFx };
