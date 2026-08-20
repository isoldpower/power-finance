import { createFileRoute } from '@tanstack/react-router'
import { PlanningPage } from "@page/planning-page";

export const Route = createFileRoute('/finance/planning/')({
	component: PlanningPage,
})
