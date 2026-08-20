import { createFileRoute } from '@tanstack/react-router'
import { PlanningPage } from "@page/planning-page";

export const Route = createFileRoute('/planning/')({
	component: PlanningPage,
})
