import type { FC } from "react";
import { SignUp } from "@clerk/clerk-react";
import { getFinanceRoute, getShellRoute, useRouteWithOrigin } from "@internal/shared";
import { getSignupPaperAppearance } from "@entity/auth";


type SignupPageProps = object & {};

const SignupPage: FC<SignupPageProps> = () => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('dashboard');

	return (
		<SignUp
			signInUrl={useRouteWithOrigin(routes.login)}
			appearance={getSignupPaperAppearance({
				layout: {
					logoLinkUrl: useRouteWithOrigin(overviewRoute)
				}
			})}
		/>
	);
};

SignupPage.displayName = 'SignupPage';

export { SignupPage };
export type { SignupPageProps };