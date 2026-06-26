import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage } from "@page/management-page";

export const Route = createFileRoute('/finance/management/')({
	component: ManagementPage,
})
