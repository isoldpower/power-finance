import {FC, Suspense} from "react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";
import {getFinanceRoute, getShellRoute} from "@internal/shared";

interface HeaderAuthenticationProps {}

const HeaderAuthentication: FC<HeaderAuthenticationProps> = () => {
	return (
		<Suspense fallback={<div>Auth loading</div>}>
			<SignedOut>
				<SignInButton>
					Sign In
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton
					fallback={<div style={{ color: 'black' }}>Auth loading</div>}
					afterSwitchSessionUrl={getFinanceRoute('overview')}
					userProfileMode='navigation'
					userProfileUrl={getShellRoute('auth').profile}
					showName
					appearance={{
						layout: {
							unsafe_disableDevelopmentModeWarnings: true,
							shimmer: false
						}
				}} />
			</SignedIn>
		</Suspense>
	)
}

export { HeaderAuthentication };
export type { HeaderAuthenticationProps };