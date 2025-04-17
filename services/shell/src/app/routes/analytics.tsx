import {createFileRoute, Outlet} from '@tanstack/react-router'
import {LayoutContainer} from "@entity/core";
import {BrandAppLoader} from "@widget/core";

export const Route = createFileRoute('/analytics')({
	pendingComponent: BrandAppLoader,
	component: AnalyticsLayout,
})

function AnalyticsLayout() {
	return (
		<LayoutContainer title='Analytics Container'>
			<Outlet />
		</LayoutContainer>
	)
}