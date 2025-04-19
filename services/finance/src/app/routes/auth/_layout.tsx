import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/_layout')({
	pendingComponent: AuthLayoutPending,
	component: AuthLayout
})

function AuthLayoutPending() {
	return (
		<div style={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			width: '100dvw',
			minHeight: '100dvh'
		}}>
			Mounting Layout...
		</div>
	)
}

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
