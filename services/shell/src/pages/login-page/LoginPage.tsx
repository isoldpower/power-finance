import { FC } from "react";
import { SignIn } from "@clerk/clerk-react";
import { getFinanceRoute, getShellRoute, useRouteWithOrigin } from "@internal/shared";
import { Link } from "@tanstack/react-router";

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
	const routes = getShellRoute('auth');
	const overviewRoute = getFinanceRoute('overview');

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				<Link to={routes.recovery}>Forgot password?</Link>
			</div>
			<SignIn
				signUpUrl={useRouteWithOrigin(routes.signup)}
				fallbackRedirectUrl={useRouteWithOrigin(overviewRoute)}
				transferable={false}
				withSignUp={false}
				appearance={{ layout: { logoLinkUrl: useRouteWithOrigin(overviewRoute) } }} />
		</div>
	);
};

LoginPage.displayName = 'LoginPage';

export { LoginPage };
export type { LoginPageProps };