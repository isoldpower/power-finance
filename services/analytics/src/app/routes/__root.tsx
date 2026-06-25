import { createRootRoute } from '@tanstack/react-router';
import { RootComponent } from '../RootComponent.tsx';
import { SettingsProvider } from "@internal/shared";


export const Route = createRootRoute({
  	component: RootLayout,
})

function RootLayout() {
	return (
		<SettingsProvider>
			<RootComponent />
		</SettingsProvider>
	);
}