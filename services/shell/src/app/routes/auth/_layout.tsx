import { createFileRoute, Outlet } from '@tanstack/react-router'
import {getTanStackPageFx} from "@shared/components";

export const Route = createFileRoute('/auth/_layout')({
	component: AuthLayout,
	...getTanStackPageFx('default-page')
})

function AuthLayout() {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100dvw',
			minHeight: '100dvh'
		}}>
			<Outlet />
		</div>
	)
}
