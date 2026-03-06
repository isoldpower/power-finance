import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Outlet } from "@tanstack/react-router";
import { AuthGuard } from "@internal/shared";

import type { FC } from "react";


const RootComponent: FC = () => {
	return (
		<AuthGuard>
			<Outlet />
			<TanStackRouterDevtools initialIsOpen={false} position='bottom-left' />
		</AuthGuard>
	);
}

export { RootComponent };
