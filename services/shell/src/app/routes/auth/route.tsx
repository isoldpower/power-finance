import { createFileRoute, Outlet } from '@tanstack/react-router'
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/auth')({
	component: AuthLayout,
	...getTanStackPageFx('default-page')
})

function AuthLayout() {
	return (
		<div className="flex justify-center items-center min-h-screen w-screen">
			<Outlet />
		</div>
	)
}
