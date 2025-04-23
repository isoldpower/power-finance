import { FC } from "react";
import { SignIn } from "@clerk/clerk-react";
import { getFinanceRoute, getShellRoute, useRouteWithOrigin } from "@internal/shared";
import { getLoginPaperAppearance } from "@entity/auth";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('overview');

	return (
		<SignIn
			signUpUrl={useRouteWithOrigin(routes.signup)}
			fallbackRedirectUrl={useRouteWithOrigin(overviewRoute)}
			transferable={false}
			withSignUp={false}
			appearance={getLoginPaperAppearance({
				layout: {
					logoLinkUrl: useRouteWithOrigin(overviewRoute)
				}
			})} />
	);
};

LoginPage.displayName = 'LoginPage';

export { LoginPage };
export type { LoginPageProps };