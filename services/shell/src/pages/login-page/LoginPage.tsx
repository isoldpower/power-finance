import { FC } from "react";
import { SignIn } from "@clerk/clerk-react";
import { getFinanceRoute, getShellRoute, useRouteWithOrigin } from "@internal/shared";
import { getLoginPaperAppearance } from "@entity/auth";

type LoginPageProps = object & {};

const LoginPage: FC<LoginPageProps> = () => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('dashboard');

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