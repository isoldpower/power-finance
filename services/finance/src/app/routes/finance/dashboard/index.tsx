import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage, searchSchema } from "@page/dashboard-page";

export const Route = createFileRoute('/finance/dashboard/')({
	component: DashboardPage,
	validateSearch: searchSchema
})