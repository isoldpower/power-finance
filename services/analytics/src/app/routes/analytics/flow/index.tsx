import { createFileRoute } from '@tanstack/react-router';
import { FlowPage, searchSchema } from "@page/flow-page";


export const Route = createFileRoute('/analytics/flow/')({
	staticData: { title: 'Flow · Analytics' },
	component: FlowPage,
	validateSearch: searchSchema,
});
