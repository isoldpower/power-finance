import { createFileRoute } from '@tanstack/react-router';
import { FlowPage, searchSchema } from "@page/flow-page";


export const Route = createFileRoute('/flow/')({
	staticData: { title: 'Flow · Analytics' },
	component: FlowPage,
	validateSearch: searchSchema,
});
