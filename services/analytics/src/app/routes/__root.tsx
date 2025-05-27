import { Outlet, createRootRoute } from '@tanstack/react-router';

import { RootComponent } from '../RootComponent.tsx';


export const Route = createRootRoute({
  	component: RootLayout,
})

function RootLayout() {
	return (
		<RootComponent>
			<Outlet />
		</RootComponent>
	);
}
