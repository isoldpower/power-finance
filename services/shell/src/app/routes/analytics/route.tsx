import {createFileRoute, Outlet} from '@tanstack/react-router'
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/analytics')({
  component: AnalyticsLayout,
	...getTanStackPageFx('default-page')
})

function AnalyticsLayout() {
	return (
		<>
			<Outlet/>
		</>
	)
}