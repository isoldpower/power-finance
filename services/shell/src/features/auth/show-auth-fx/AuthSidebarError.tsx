import { clerk } from "@internal/shared";
import type { FC, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";


interface AuthSidebarFxProps {
	pendingComponent: ReactNode;
	errorComponent: ReactNode;
	children: ReactNode;
}

const AuthSidebarFx: FC<AuthSidebarFxProps> = ({ pendingComponent, errorComponent, children }) => {
	return (
		<>
			<clerk.ClerkLoading>
				{pendingComponent}
			</clerk.ClerkLoading>
			<clerk.ClerkLoaded>
				<ErrorBoundary fallback={errorComponent}>
					{children}
				</ErrorBoundary>
			</clerk.ClerkLoaded>
		</>
	);
};

AuthSidebarFx.displayName = 'AuthSidebarFx';

export { AuthSidebarFx };
export type { AuthSidebarFxProps };
