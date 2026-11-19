import { useAnalyticsQuery } from "@feature/filters";
import { KpisFx, useKpiSources } from "@feature/overview";
import { KpiStrip } from "@widget/overview";

import type { FC } from "react";


const KpisWithFx: FC = () => {
	const query = useAnalyticsQuery();
	const { sources, isPending, isError } = useKpiSources(query);

	return (
		<KpisFx
			isPending={isPending}
			isError={isError}
			sources={sources}
		>
			{(loaded) => (
				<KpiStrip
					overview={loaded.overview}
					cashFlow={loaded.cashFlow}
				/>
			)}
		</KpisFx>
	);
};

KpisWithFx.displayName = 'KpisWithFx';

export { KpisWithFx };
