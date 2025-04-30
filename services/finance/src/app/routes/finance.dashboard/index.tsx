import { createFileRoute } from '@tanstack/react-router'
import { DashboardPage } from "@page/dashboard-page";

export const Route = createFileRoute('/finance/dashboard/')({
	component: DashboardPage,
})