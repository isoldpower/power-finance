import type {FC} from "react";
import {Suspense} from "react";
import {SignedIn, SignedOut, UserButton} from "@clerk/clerk-react";
import {getFinanceRoute, getShellRoute, useSettingsContext} from "@internal/shared";
import {getUserButtonAppearance, SidebarBox, SidebarError, SidebarSkeleton, SignInButton} from "@entity/auth";
import {AuthSidebarFx, NavigateToSignIn, useClerkTheme} from "@feature/auth";

interface SidebarAuthenticationProps {}

const SidebarAuthentication: FC<SidebarAuthenticationProps> = () => {
	const {sidebarOpen} = useSettingsContext();
	const clerkTheme = useClerkTheme();

	return (
		<Suspense fallback={<SidebarSkeleton />}>
			<SidebarBox>
				<AuthSidebarFx pendingComponent={<SidebarSkeleton />} errorComponent={<SidebarError />}>
					<SignedIn>
						<UserButton
							fallback={<SidebarSkeleton />}
							afterSwitchSessionUrl={getFinanceRoute('overview')}
							userProfileMode='navigation'
							userProfileUrl={getShellRoute('auth').profile}
							showName={sidebarOpen}
							appearance={getUserButtonAppearance({ baseTheme: clerkTheme })} />
					</SignedIn>
					<SignedOut>
						<NavigateToSignIn>
							<SignInButton>
								Sign in
							</SignInButton>
						</NavigateToSignIn>
					</SignedOut>
				</AuthSidebarFx>
			</SidebarBox>
		</Suspense>
	)
}

export { SidebarAuthentication };
export type { SidebarAuthenticationProps };