import { createFileRoute } from '@tanstack/react-router';
import { SpendingPage, searchSchema } from "@page/spending-page";


export const Route = createFileRoute('/spending/')({
	staticData: { title: 'Spending · Analytics' },
	component: SpendingPage,
	validateSearch: searchSchema,
});
