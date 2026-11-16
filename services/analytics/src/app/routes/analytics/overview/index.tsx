import { createFileRoute } from '@tanstack/react-router';
import { OverviewPage, searchSchema } from "@page/overview-page";


export const Route = createFileRoute('/analytics/overview/')({
	staticData: { title: 'Overview · Analytics' },
	component: OverviewPage,
	validateSearch: searchSchema,
});
