import {createFileRoute} from '@tanstack/react-router'
import {AnalyticsPageLazy} from "@page/analytics";

export const Route = createFileRoute('/analytics/')({
	component: AnalyticsPageLazy,
})