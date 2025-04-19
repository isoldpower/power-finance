import {FC} from "react";
import {SignUp} from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import {getFinanceRoute, getShellRoute, useRouteWithOrigin} from "@internal/shared";

interface SignupPageProps {}

const SignupPage: FC<SignupPageProps> = () => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('overview');

	return (
		<SignUp
			signInUrl={useRouteWithOrigin(routes.login)}
			appearance={{
				baseTheme: dark,
				layout: {
					logoLinkUrl: useRouteWithOrigin(overviewRoute),
					unsafe_disableDevelopmentModeWarnings: true,
					socialButtonsPlacement: 'bottom',
					socialButtonsVariant: 'blockButton'
				}
			}}
		/>
	);
};

SignupPage.displayName = 'SignupPage';

export { SignupPage };
export type { SignupPageProps };