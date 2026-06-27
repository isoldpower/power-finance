import { createFileRoute } from '@tanstack/react-router'
import { ManagementPage, searchSchema } from "@page/management-page";

export const Route = createFileRoute('/management/')({
	component: ManagementPage,
	validateSearch: searchSchema,
})
