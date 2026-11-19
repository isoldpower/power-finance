import { ChartMessage } from "@shared/charts";
import { QueryFx } from "@shared/feedback";
import { KpiStripSkeleton } from "./fx-partials/KpiStripSkeleton.tsx";

import type { FC, ReactNode } from "react";
import type { KpiSources } from "../kpis";


interface KpisFxProps {
	isPending: boolean;
	isError: boolean;
	sources: KpiSources | undefined;
	children: (sources: KpiSources) => ReactNode;
}

const ERROR_HEIGHT = 120;

const KpisFx: FC<KpisFxProps> = ({ isPending, isError, sources, children }) => (
	<QueryFx
		isPending={isPending}
		isError={isError}
		data={sources}
		pending={<KpiStripSkeleton />}
		error={<ChartMessage height={ERROR_HEIGHT} title="Couldn’t load headline numbers" />}
	>
		{children}
	</QueryFx>
);

KpisFx.displayName = 'KpisFx';

export { KpisFx };
export type { KpisFxProps };
