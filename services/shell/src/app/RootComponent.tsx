import { AuthProvider } from "@internal/shared";
import { SidebarProvider, useClerkDarkTheme, useClerkLightTheme } from "@internal/ui-library";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { checkEnvVariables } from "./env/checkEnv";
import { ThemeHandler } from "@feature/settings";
import { ReactNode } from "react";


interface RootComponentProps {
	children: ReactNode;
}

function RootComponent({ children }: RootComponentProps) {
	const envVariables = checkEnvVariables();
	const themeDictionary = {
		light: useClerkLightTheme(),
		dark: useClerkDarkTheme(),
	};
	
	return (
		<AuthProvider
			publicKey={envVariables.CLIENT_CLERK_PUBLIC_KEY}
			clerkThemes={themeDictionary}
		>
			<ThemeHandler>
				<SidebarProvider>
					{children}
					<TanStackRouterDevtools initialIsOpen={false} position='bottom-right' />
				</SidebarProvider>
			</ThemeHandler>
		</AuthProvider>
	);
}

RootComponent.displayName = 'LayoutRoot';

export { RootComponent };
export default RootComponent;