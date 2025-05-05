import { createFileRoute, Outlet } from '@tanstack/react-router'
import { getTanStackPageFx } from "@shared/components";
import { LabeledThemeSwitch } from "@widget/settings";
import {ExternalNavigationBar} from "@widget/auth";

export const Route = createFileRoute('/auth')({
	component: AuthLayout,
	...getTanStackPageFx('default-page')
})

function AuthLayout() {
	return (
		<div className="flex justify-center items-center min-h-screen w-screen">
			<div className="absolute top-2 left-2 z-10 rounded bg-accent p-2">
				<LabeledThemeSwitch>Dark Mode</LabeledThemeSwitch>
			</div>
			<div className="flex flex-col gap-2">
				<ExternalNavigationBar />
				<Outlet />
			</div>
		</div>
	)
}
