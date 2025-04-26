import { createRootRoute } from '@tanstack/react-router'
import { lazy } from "react";
import { AppError, AppLoader } from "@internal/ui-library";

import { getTanStackPageFx, GlobalLayout } from "@shared/components";


export const Route = createRootRoute({
	pendingComponent: AppLoader,
	errorComponent: AppError,
	component: RootLayout,
	...getTanStackPageFx('default-page')
})

const RootComponent = lazy(() => import('../RootComponent.tsx'));

function RootLayout () {
	return (
		<GlobalLayout>
			<RootComponent />
		</GlobalLayout>
	)
}