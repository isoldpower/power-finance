import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {SettingsProvider} from "@internal/shared";
import {AuthProvider} from "@feature/auth";
import {getTanStackPageFx} from "@shared/components";

export const Route = createRootRoute({
	component: () => (
		<AuthProvider publicKey={import.meta.env.CLIENT_CLERK_PUBLIC_KEY}>
			<SettingsProvider>
				<Outlet/>
				<TanStackRouterDevtools/>
			</SettingsProvider>
		</AuthProvider>
	),
	...getTanStackPageFx('default-page')
})