import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage, searchSchema } from "@page/management-page";

export const Route = createFileRoute('/management/')({
	staticData: { title: 'Management' },
	component: ManagementPage,
	validateSearch: searchSchema,
})
