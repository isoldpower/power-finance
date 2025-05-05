import type {FC, ReactNode} from "react";
import {useRef, Suspense} from "react";
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import {getFinanceRoute, getShellRoute, NavigateToSignIn, useSettingsContext} from "@internal/shared";
import {getUserButtonAppearance, SidebarBox, SidebarError, SidebarSkeleton, SignInButton} from "@entity/auth";
import {AuthSidebarFx} from "@feature/auth";

interface SidebarAuthenticationProps {}

const SidebarAuthentication: FC<SidebarAuthenticationProps> = () => {
	const {sidebarOpen} = useSettingsContext();
	const pendingComponent = useRef<ReactNode>(
		<SidebarBox>
			<SidebarSkeleton withName={sidebarOpen} />
		</SidebarBox>
	);

	return (
		<Suspense fallback={pendingComponent.current}>
			<AuthSidebarFx
				pendingComponent={pendingComponent.current}
				errorComponent={<SidebarError />}>
				<SignedIn>
					<SidebarBox>
						<UserButton
							fallback={<SidebarSkeleton withName={sidebarOpen} />}
							afterSwitchSessionUrl={getFinanceRoute('dashboard')}
							userProfileMode='navigation'
							userProfileUrl={getShellRoute('auth').profile}
							showName={sidebarOpen}
							appearance={getUserButtonAppearance()} />
					</SidebarBox>
				</SignedIn>
			</AuthSidebarFx>
			<SignedOut>
				<NavigateToSignIn>
					<SignInButton>
						Sign in
					</SignInButton>
				</NavigateToSignIn>
			</SignedOut>
		</Suspense>
	)
}

export { SidebarAuthentication };
export type { SidebarAuthenticationProps };