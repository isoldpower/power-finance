import { createFileRoute } from '@tanstack/react-router'
import { OverviewPage } from "@page/overview-page";

export const Route = createFileRoute('/finance/overview')({
	component: OverviewPage,
})