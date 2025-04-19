import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {SettingsProvider} from "@internal/shared";
import {AuthProvider} from "@feature/auth";

export const Route = createRootRoute({
	component: () => (
		<AuthProvider publicKey={import.meta.env.CLIENT_CLERK_PUBLIC_KEY}>
			<SettingsProvider>
				<Outlet/>
				<TanStackRouterDevtools/>
			</SettingsProvider>
		</AuthProvider>
	)
})