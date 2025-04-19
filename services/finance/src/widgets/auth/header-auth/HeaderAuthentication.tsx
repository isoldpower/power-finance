import {FC} from "react";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";

interface HeaderAuthenticationProps {}

const HeaderAuthentication: FC<HeaderAuthenticationProps> = () => {
	return (
		<>
			<SignedOut>
				<SignInButton>
					Sign In
				</SignInButton>
			</SignedOut>
			<SignedIn>
				<UserButton />
			</SignedIn>
		</>
	)
}

export { HeaderAuthentication };
export type { HeaderAuthenticationProps };